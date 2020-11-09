import React, { useEffect } from 'react';
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
  updateValue: (index: number, newValue: number | null) => void;
}

const SetCalculatorDropdown: React.FC<SetCalculatorConfigMap> =
  ({ id, label, map, updateSelected }) => {
    const onChange = React.useCallback(
      (event: React.ChangeEvent<
        {
          name?: string | undefined;
          value: unknown
        }>): void => {
        updateSelected(event.target.value as string || '');
      },
      [updateSelected]);

    const options: JSX.Element[] = [];
    map.forEach((value: string, key: string) =>
      options.push(<MenuItem value={key} key={`${id}_${key}`}>{value}</MenuItem>));

    return (
      <FormControl variant="outlined" fullWidth>
        <InputLabel htmlFor={`${id}_label`}>{label}</InputLabel>
        <Select
          labelId={`${id}_label`}
          id={id}
          onChange={onChange}
          label={label}
          autoWidth
          fullWidth
          defaultValue=''
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
        id={id}
        label={label}
        placeholder='# of Coins'
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        variant='outlined'
        type='number'
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

export const SetCalculatorPage: React.FC = () => {
  const categoryDropdownOptions: Map<string, string> = new Map<string, string>();
  CATEGORY_CONFIG.forEach(
    (value: SetCalculatorCategoryConfig, key: string) =>
      categoryDropdownOptions.set(key, value.label));

  const [categoryId, setCategoryId] = React.useState('');
  const [category, setCategory] = React.useState<SetCalculatorCategoryConfig | undefined>();
  const [setDropdownOptions, setSetDropdownOptions] = React.useState<Map<string, string>>();
  const [setId, setSetId] = React.useState('');
  const [set, setSet] = React.useState<SetCalculatorSetConfig>();

  useEffect(() => setCategory(CATEGORY_CONFIG.get(categoryId)), [categoryId]);

  useEffect(() => {
    const newSetDropdownOptions: Map<string, string> = new Map<string, string>();

    category?.map?.forEach(
      (value: SetCalculatorSetConfig, key: string) =>
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
        throw new Error('Need requirements values');
      }

      requirementsValues[index] = newValue;
      setRequirementsValues([...requirementsValues]);
    },
    [requirementsValues]);

  const onBuildsValueChange = React.useCallback(
    (index: number, newValue: number | null) => {
      if (!buildsValues) {
        throw new Error('Need builds values');
      }

      buildsValues[index] = newValue;
      setBuildsValues([...buildsValues]);
    },
    [buildsValues]);

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
              updateSelected={onCategoryDropdownChange} />
          </Grid>
        </Grid>
        <Grid container item spacing={3} xs={12} sm={6} alignItems='stretch'>
          <Grid item xs={12}>
            <SetCalculatorDropdown
              id='buildSetCalculatorSetDropdown'
              label='Set'
              map={setDropdownOptions || new Map<string, string>()}
              updateSelected={onSetDropdownChange} />
          </Grid>
        </Grid>
        <Grid container item spacing={3} xs={12} justify='center' alignItems='stretch'>
          <Grid item xs={12}>
            <Typography display="block" variant='overline'>Inputs &amp; Outputs: Coin Values</Typography>
            <Divider />
          </Grid>
        </Grid>
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
        <Grid container item spacing={3} xs={12} justify='center' alignItems='stretch'>
          <Grid item xs={12}>
            <Typography display="block" variant='overline'>Profit</Typography>
            <Divider />
          </Grid>
        </Grid>
        <Grid container item spacing={3} xs={12} justify='flex-end' alignItems='stretch'>
          <Grid item xs={6}>
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
                fullWidth
              />
              : null}
          </Grid>
        </Grid>
      </Grid >
    </Grid>
  );
};
