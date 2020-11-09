import React, { useEffect } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {
  BuildSetCalculatorCategoryConfig,
  BuildSetCalculatorConfigMap,
  BuildSetCalculatorSetConfig,
  BuildSetCalculatorSetItemProps
} from './BuildSetCalculatorCommon';
import CATEGORY_CONFIG from './BuildSetCalculatorPageConfig';

interface BuildSetCalculatorItemControlProps extends BuildSetCalculatorSetItemProps {
  id: string;
  index: number;
  updateValue: (index: number, newValue: number | null) => void;
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const BuildSetCalculatorDropdown: React.FC<BuildSetCalculatorConfigMap> =
  ({ id, label, map, updateSelected }) => {
    const classes = useStyles();

    const onChange = React.useCallback(
      (event: React.ChangeEvent<
        {
          name?: string | undefined;
          value: unknown
        }>): void => {
        updateSelected(event.target.value as string);
      },
      [updateSelected]);

    const options: React.ReactElement[] = [];
    map.forEach((value: string, key: string) => options.push(<option value={key}>{value}</option>));

    return (
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <Select
          native
          onChange={onChange}
          label={label}
          inputProps={{
            id: id
          }}
        >
          <option aria-label="Select..." value="" />
          {options}
        </Select>
      </FormControl>
    );
  };

const BuildSetCalculatorItemControl: React.FC<BuildSetCalculatorItemControlProps> =
  ({ id, label, index, updateValue }) => {
    const [numericValue, setNumericValue] = React.useState<number | null>(null);

    React.useEffect(() => updateValue(index, numericValue), [index, updateValue, numericValue]);

    const onChangeTextFieldValue = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const val: string = (event.target.value || '').trim();
        const newNumeric: (number | null) = val.length ? Number(val) : Number.NaN;
        setNumericValue(newNumeric === Number.NaN ? null : newNumeric);
      },
      [],
    );

    return (
      <TextField
        label={label}
        type="number"
        InputLabelProps={{
          shrink: true
        }}
        variant="outlined"
        onChange={onChangeTextFieldValue}
      />
    );
  };

const invalidCalculateNumbers: Set<number | null> = new Set<number | null>([null, Number.NaN, NaN]);

const attemptCalculateSum: (values: (number | null)[] | undefined) => number | null =
  (values: (number | null)[] | undefined) => {
    if (!values) {
      return null;
    }

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

const roundTo = function (num: number, places: number) {
  const factor = 10 ** places;
  return Math.round(num * factor) / factor;
};

export const BuildSetCalculatorPage: React.FC = () => {
  const categoryDropdownOptions: Map<string, string> = new Map<string, string>();
  CATEGORY_CONFIG.forEach(
    (value: BuildSetCalculatorCategoryConfig, key: string) =>
      categoryDropdownOptions.set(key, value.label));

  const [categoryId, setCategoryId] = React.useState('');
  const [category, setCategory] = React.useState<BuildSetCalculatorCategoryConfig | undefined>();
  const [setDropdownOptions, setSetDropdownOptions] = React.useState<Map<string, string>>();
  const [setId, setSetId] = React.useState('');
  const [set, setSet] = React.useState<BuildSetCalculatorSetConfig>();

  useEffect(() => setCategory(CATEGORY_CONFIG.get(categoryId)), [categoryId]);

  useEffect(() => {
    const newSetDropdownOptions: Map<string, string> = new Map<string, string>();

    category?.map?.forEach(
      (value: BuildSetCalculatorSetConfig, key: string) =>
        newSetDropdownOptions.set(key, value.setName));

    setSetDropdownOptions(newSetDropdownOptions);
  }, [category]);

  useEffect(() => setSet(category?.map?.get(setId)), [category, setId]);

  const onCategoryDropdownChange = React.useCallback((key: string) => setCategoryId(key), []);
  const onSetDropdownChange = React.useCallback((key: string) => setSetId(key), []);

  const [requirementsValues, setRequirementsValues] = React.useState<(number | null)[]>();
  const [buildsValues, setBuildsValues] = React.useState<(number | null)[]>();

  const [sumRequirements, setSumRequirements] = React.useState(0);
  const [sumBuilds, setSumBuilds] = React.useState(0);

  const [canCalculateRequirementsSum, setCanCalculateRequirementsSum] = React.useState(false);
  const [canCalculateBuildsSum, setCanCalculateBuildsSum] = React.useState(false);
  const [canCalculateProfit, setCanCalculateProfit] = React.useState(false);
  const [netProfitLabel, setNetProfitLabel] = React.useState('');

  const maddenTax: number = 10;

  React.useEffect(
    () => {
      if (set) {
        setRequirementsValues(set.requirements.map(_ => null));
        setBuildsValues(set.builds.map(_ => null));
      } else {
        setRequirementsValues([null]);
        setBuildsValues([null]);
      }
    },
    [set]);

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
      const profit: number = canCalculateProfit
        ? roundTo((sumBuilds * (1 - (maddenTax / 100)) - sumRequirements), 2)
        : NaN;

      setNetProfitLabel(invalidCalculateNumbers.has(profit) ? 'Cannot calculate' : profit.toString());
    },
    [canCalculateProfit, sumRequirements, sumBuilds]);

  const onRequirementsValueChange = React.useCallback(
    (index: number, newValue: number | null) => {
      if (!requirementsValues) {
        throw 'Need requirements values';
      }

      requirementsValues[index] = newValue;
      setRequirementsValues([...requirementsValues]);
    },
    [requirementsValues]);

  const onBuildsValueChange = React.useCallback(
    (index: number, newValue: number | null) => {
      if (!buildsValues) {
        throw 'Need builds values';
      }

      buildsValues[index] = newValue;
      setBuildsValues([...buildsValues]);
    },
    [buildsValues]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <BuildSetCalculatorDropdown
          id='buildSetCalculatorCategoryDropdown'
          label='Category'
          map={categoryDropdownOptions}
          updateSelected={onCategoryDropdownChange} />
      </Grid>
      <Grid item xs={12} md={6}>
        {setDropdownOptions?.size
          ? <BuildSetCalculatorDropdown
            id='buildSetCalculatorSetDropdown'
            label='Set'
            map={setDropdownOptions}
            updateSelected={onSetDropdownChange} />
          : null}
      </Grid>
      <Grid item xs={12} md={6}>
        {set?.requirements.map(
          (item: BuildSetCalculatorSetItemProps, index: number) =>
            <BuildSetCalculatorItemControl
              id={`requirements${index}`}
              label={item.label}
              index={index}
              updateValue={onRequirementsValueChange} />
        )}
      </Grid>
      <Grid item xs={12} md={6}>
        {set?.builds.map(
          (item: BuildSetCalculatorSetItemProps, index: number) =>
            <BuildSetCalculatorItemControl
              id={`builds${index}`}
              label={item.label}
              index={index}
              updateValue={onBuildsValueChange} />
        )}
      </Grid>
      <Grid item xs={12}>
        {set
          ? <TextField
            label="Profit"
            value={netProfitLabel}
            InputProps={{
              readOnly: true
            }}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          : null}
      </Grid>
    </Grid>
  );
};
