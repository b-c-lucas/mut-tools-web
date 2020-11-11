import React from 'react';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {
  SetCalculatorCategoryConfig,
  SetCalculatorConfigMap,
  SetCalculatorSetConfig,
  SetCalculatorSetItemProps
} from './SetCalculatorCommon';
import CATEGORY_CONFIG from './config/setConfig';

interface SetCalculatorItemControlProps extends SetCalculatorSetItemProps {
  id: string;
  index: number;
  updateValue: (index: number, newValue: number) => void;
}

const MADDEN_TAX: number = 10;

const SetCalculatorDropdown: React.FC<SetCalculatorConfigMap> =
  ({ id, label, map, value, updateSelected }) => {
    const onChange = React.useCallback(
      (event: React.ChangeEvent<
        {
          name?: string | undefined;
          value: unknown
        }>): void => {
        const newValue: string = event.target.value as string || '';
        updateSelected(newValue);
      },
      [updateSelected]);

    const options: JSX.Element[] = [];
    map.forEach((value: string, key: string) =>
      options.push(<MenuItem value={key} key={`${id}_${key}`}>{value}</MenuItem>));

    return (
      <FormControl variant='outlined' fullWidth>
        <InputLabel htmlFor={`${id}_label`}>{label}</InputLabel>
        <Select
          labelId={`${id}_label`}
          id={id}
          onChange={onChange}
          label={label}
          autoWidth
          fullWidth
          defaultValue=''
          value={value}
          disabled={!options.length}
        >
          <MenuItem value=''>
            <em>Select a value...</em>
          </MenuItem>
          {options}
        </Select>
      </FormControl>
    );
  };

const SetCalculatorItemControl: React.FC<SetCalculatorItemControlProps> =
  ({ id, label, index, updateValue }) => {
    const onChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        updateValue(index, parseInt(event.target.value));
      },
      [index, updateValue],
    );

    return (
      <TextField
        id={id}
        label={label}
        placeholder='# of Coins'
        fullWidth
        inputProps={{
          min: 0,
          step: 1
        }}
        InputLabelProps={{
          shrink: true,
        }}
        variant='outlined'
        type='number'
        onChange={onChange}
      />
    );
  };

const attemptCalculateSum: (values: number[]) => number = (values: number[]) => {
  if (!values || !values.length) {
    return NaN;
  }

  let sum: number = 0;

  for (let i = 0; i < values.length; i++) {
    if (isNaN(values[i])) {
      return NaN;
    }

    sum += values[i] as number;
  }

  return sum;
};

const roundTo = function (num: number, places: number) {
  const factor = 10 ** places;
  return Math.round(num * factor) / factor;
};

export const SetCalculatorPage: React.FC = () => {
  const categoryDropdownOptions: Map<string, string> = new Map<string, string>();
  CATEGORY_CONFIG.forEach(
    (value: SetCalculatorCategoryConfig, key: string) => {
      if (value?.map?.size) {
        categoryDropdownOptions.set(key, value.label);
      }
    });

  const [categoryId, setCategoryId] = React.useState('');
  const [category, setCategory] = React.useState<SetCalculatorCategoryConfig | undefined>();
  const [setDropdownOptions, setSetDropdownOptions] = React.useState<Map<string, string>>();
  const [setId, setSetId] = React.useState('');
  const [set, setSet] = React.useState<SetCalculatorSetConfig>();

  const onCategoryDropdownChange = React.useCallback((key: string) => {
    if (key !== categoryId) {
      const newCategory: SetCalculatorCategoryConfig | undefined = CATEGORY_CONFIG.get(key);
      const newSetDropdownOptions: Map<string, string> = new Map<string, string>();
      newCategory?.map?.forEach(
        (value: SetCalculatorSetConfig, key: string) =>
          newSetDropdownOptions.set(key, value.setName));

      setSet(undefined);
      setSetId('');
      setSetDropdownOptions(newSetDropdownOptions);
      setCategory(newCategory);
      setCategoryId(key);
    }
  }, [categoryId]);

  const onSetDropdownChange = React.useCallback((key: string) => {
    if (key !== setId) {
      if (category && category.map) {
        setSetId(key);
        setSet(category.map.get(key));
      } else {
        setSet(undefined);
        setSetId('');
      }
    }
  }, [category, setId]);

  const [requirementsValues, setRequirementsValues] = React.useState<number[]>([]);
  const [buildsValues, setBuildsValues] = React.useState<number[]>([]);

  const [sumRequirements, setSumRequirements] = React.useState(0);
  const [sumBuilds, setSumBuilds] = React.useState(0);

  const [proceedsLabel, setProceedsLabel] = React.useState('');
  const [maddenTaxLabel, setMaddenTaxLabel] = React.useState('');
  const [expensesLabel, setExpensesLabel] = React.useState('');
  const [profitLabel, setProfitLabel] = React.useState('');

  React.useEffect(() => {
    if (set) {
      setRequirementsValues(set.requirements.map(_ => NaN));
      setBuildsValues(set.builds.map(_ => NaN));
    } else {
      setRequirementsValues([]);
      setBuildsValues([]);
    }
  }, [set]);

  React.useEffect(
    () => setSumRequirements(attemptCalculateSum(requirementsValues)),
    [requirementsValues]);

  React.useEffect(
    () => setSumBuilds(attemptCalculateSum(buildsValues)),
    [buildsValues]);

  React.useEffect(() => {
    setExpensesLabel(isNaN(sumRequirements) ? 'Cannot calculate' : sumRequirements.toString())

    if (isNaN(sumBuilds)) {
      setProceedsLabel('Cannot calculate');
      setMaddenTaxLabel('Cannot calculate');
    } else {
      setProceedsLabel(sumBuilds.toString());
      setMaddenTaxLabel(roundTo(sumBuilds * (MADDEN_TAX / 100), 2).toString());
    }

    const profit: number = isNaN(sumRequirements) || isNaN(sumBuilds)
      ? NaN
      : roundTo((sumBuilds * (1 - (MADDEN_TAX / 100)) - sumRequirements), 2);

    setProfitLabel(isNaN(profit) ? 'Cannot calculate' : profit.toString());
  }, [sumRequirements, sumBuilds]);

  const onRequirementsValueChange = React.useCallback((index: number, newValue: number) => {
    if (!requirementsValues) {
      throw new Error('Need requirements values');
    }

    requirementsValues[index] = newValue;
    setRequirementsValues([...requirementsValues]);
  }, [requirementsValues]);

  const onBuildsValueChange = React.useCallback((index: number, newValue: number) => {
    if (!buildsValues) {
      throw new Error('Need builds values');
    }

    buildsValues[index] = newValue;
    setBuildsValues([...buildsValues]);
  }, [buildsValues]);

  return (
    <Grid container justify='center'>
      <Grid container item xs={12} md={10} lg={8} spacing={3} justify='center'>
        <Grid container item spacing={3} xs={12} justify='center' alignItems='stretch'>
          <Grid item xs={12}>
            <Typography display="block" variant='overline'>Pick a set</Typography>
            <Divider />
          </Grid>
        </Grid>
        <Grid container item spacing={3} xs={12} sm={6} alignItems='stretch'>
          <Grid item xs>
            <SetCalculatorDropdown
              id='buildSetCalculatorCategoryDropdown'
              label='Category'
              map={categoryDropdownOptions}
              value={categoryId}
              updateSelected={onCategoryDropdownChange} />
          </Grid>
        </Grid>
        <Grid container item spacing={3} xs={12} sm={6} alignItems='stretch'>
          <Grid item xs={12}>
            <SetCalculatorDropdown
              id='buildSetCalculatorSetDropdown'
              label='Set'
              map={setDropdownOptions || new Map<string, string>()}
              value={setId}
              updateSelected={onSetDropdownChange} />
          </Grid>
        </Grid>
        {
          set
            ? <Grid container item spacing={3} xs={12} justify='center' alignItems='stretch'>
              <Grid item xs={12}>
                <Typography display="block" variant='overline'>Inputs &amp; Outputs: Coin Values</Typography>
                <Divider />
              </Grid>
            </Grid>
            : null
        }
        <Grid container item spacing={3} xs={12} sm={6} alignItems='stretch' direction='column'>
          {set?.requirements.map(
            (item: SetCalculatorSetItemProps, index: number) =>
              <Grid item xs={12} key={`requirements${index}_grid`}>
                <SetCalculatorItemControl
                  id={`requirements${index}`}
                  label={`INPUT: ${item.label}`}
                  index={index}
                  updateValue={onRequirementsValueChange} />
              </Grid>
          )}
        </Grid>
        <Grid container item spacing={3} xs={12} sm={6} alignItems='stretch' direction='column'>
          {set?.builds.map(
            (item: SetCalculatorSetItemProps, index: number) =>
              <Grid item xs={12} key={`builds${index}_grid`}>
                <SetCalculatorItemControl
                  id={`builds${index}`}
                  label={`OUTPUT: ${item.label}`}
                  index={index}
                  updateValue={onBuildsValueChange} />
              </Grid>
          )}
        </Grid>
        {
          set
            ? <Grid container item spacing={3} xs={12} justify='center' alignItems='stretch'>
              <Grid item xs={12}>
                <Typography display="block" variant='overline'>Calculations</Typography>
                <Divider />
              </Grid>
            </Grid>
            : null
        }
        {
          set
            ? <Grid container item spacing={3} xs={12} justify='flex-end' alignItems='stretch' direction='row'>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='Proceeds'
                  value={proceedsLabel}
                  InputProps={{
                    readOnly: true
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant='outlined'
                  fullWidth
                  disabled={proceedsLabel === 'Cannot calculate'}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='Madden Tax'
                  value={maddenTaxLabel}
                  InputProps={{
                    readOnly: true
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant='outlined'
                  fullWidth
                  disabled={maddenTaxLabel === 'Cannot calculate'}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='Costs'
                  value={expensesLabel}
                  InputProps={{
                    readOnly: true
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant='outlined'
                  fullWidth
                  disabled={expensesLabel === 'Cannot calculate'}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='Profit'
                  value={profitLabel}
                  InputProps={{
                    readOnly: true
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant='outlined'
                  fullWidth
                  disabled={profitLabel === 'Cannot calculate'}
                />
              </Grid>
            </Grid>
            : null
        }
      </Grid>
    </Grid>
  );
};
