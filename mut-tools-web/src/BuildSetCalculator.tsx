import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Stack, IStackProps, IStackStyles } from 'office-ui-fabric-react/lib/Stack';
import { BuildSetCalculatorConfig, BuildSetCalculatorItemProps } from './BuildSetCalculatorCommon';

const stackTokens = { childrenGap: 50 };
const iconProps = {};
const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 300 } },
};

interface BuildSetCalculatorItemControlProps extends BuildSetCalculatorItemProps {
  index: number;
  updateValue: (index: number, newValue: number | null) => void;
}

const BuildSetCalculatorItemControl: React.FC<BuildSetCalculatorItemControlProps> =
  ({ label, index, updateValue }) => {
    const [numericValue, setNumericValue] = React.useState<number | null>(null);

    React.useEffect(() => updateValue(index, numericValue), [numericValue]);

    const onChangeTextFieldValue = React.useCallback(
      (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        const val: string = (newValue || '').trim();
        const newNumeric: (number | null) = val.length ? Number(val) : Number.NaN;
        setNumericValue(newNumeric === Number.NaN ? null : newNumeric);
      },
      [],
    );

    return (
      <TextField label={label} iconProps={iconProps} onChange={onChangeTextFieldValue} />
    );
  };

export const BuildSetCalculator: React.FC<BuildSetCalculatorConfig> = ({ requirements, builds }) => {
  const defaultRequirementsValues: (number | null)[] = requirements.map(() => null);
  const [requirementsValues, setRequirementsValues] = React.useState(defaultRequirementsValues);

  const defaultBuildsValues: (number | null)[] = builds.map(() => null);
  const [buildsValues, setBuildsValues] = React.useState(defaultBuildsValues);

  const [sumRequirements, setSumRequirements] = React.useState(0);
  const [sumBuilds, setSumBuilds] = React.useState(0);

  const [canCalculateRequirementsSum, setCanCalculateRequirementsSum] = React.useState(false);
  const [canCalculateBuildsSum, setCanCalculateBuildsSum] = React.useState(false);
  const [canCalculateProfitable, setCanCalculateProfit] = React.useState(false);
  const [netProfitLabel, setNetProfitLabel] = React.useState('');

  const maddenTax: number = 10;

  const invalidCalculateNumbers: Set<number | null> = new Set<number | null>([null, Number.NaN, NaN]);

  const attemptCalculateSum: (values: (number | null)[]) => number | null =
    (values: (number | null)[]) => {
      let sum: number = 0;
      let canCalculate: boolean = true;

      for (let i = 0; i < values.length; i++) {
        if (invalidCalculateNumbers.has(values[i])) {
          canCalculate = false;
          sum = 0;
          break;
        } else {
          sum += values[i] as number;
        }
      }

      return canCalculate ? sum : null;
    };

  React.useEffect(
    () => {
      const attemptCalculate = attemptCalculateSum(requirementsValues);
      setCanCalculateRequirementsSum(attemptCalculate !== null);
      setSumRequirements(attemptCalculate || Number.NaN);
    },
    [requirementsValues]);

  React.useEffect(
    () => {
      const attemptCalculate = attemptCalculateSum(buildsValues);
      setCanCalculateBuildsSum(attemptCalculate !== null);
      setSumBuilds(attemptCalculate || Number.NaN);
    },
    [buildsValues]);

  React.useEffect(
    () => setCanCalculateProfit(canCalculateRequirementsSum && canCalculateBuildsSum),
    [canCalculateRequirementsSum, canCalculateBuildsSum]);

  React.useEffect(
    () => {
      const profit: number = canCalculateProfitable
        ? (sumBuilds * (1 - (maddenTax / 100)) - sumRequirements)
        : Number.NaN;

      setNetProfitLabel(invalidCalculateNumbers.has(profit) ? 'Cannot calculate' : profit.toString());
    },
    [canCalculateProfitable, sumRequirements, sumBuilds]);

  const onRequirementsValueChange = React.useCallback((index: number, newValue: number | null) => {
    requirementsValues[index] = newValue;
    setRequirementsValues([...requirementsValues]);
  }, []);

  const onBuildsValueChange = React.useCallback((index: number, newValue: number | null) => {
    buildsValues[index] = newValue;
    setBuildsValues([...buildsValues]);
  }, []);

  return (
    <React.Fragment>
      <Stack horizontal tokens={stackTokens} styles={stackStyles}>
        <Stack {...columnProps}>
          {
            requirements.map(
              (item: BuildSetCalculatorItemProps, index: number) =>
                <BuildSetCalculatorItemControl
                  label={item.label}
                  index={index}
                  updateValue={onRequirementsValueChange} />
            )
          }
        </Stack>
        <Stack {...columnProps}>
          {
            builds.map(
              (item: BuildSetCalculatorItemProps, index: number) =>
                <BuildSetCalculatorItemControl
                  label={item.label}
                  index={index}
                  updateValue={onBuildsValueChange} />
            )
          }
        </Stack>
      </Stack>
      <hr />
      <TextField label='Net Profit' iconProps={iconProps} value={netProfitLabel} readOnly={true} />
    </React.Fragment>
  );
};