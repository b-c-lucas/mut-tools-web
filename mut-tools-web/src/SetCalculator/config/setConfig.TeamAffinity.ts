import {
  SetCalculatorCategoryConfig,
  SetCalculatorSetConfig
} from '../SetCalculatorCommon';

interface ConfigDefinition {
}

// eslint-disable-next-line
const IDS: ConfigDefinition = {
};

// eslint-disable-next-line
const LABELS: ConfigDefinition = {
};

const config: Map<string, SetCalculatorSetConfig> = new Map<string, SetCalculatorSetConfig>();

export const CATEGORY_CONFIG: SetCalculatorCategoryConfig = {
  id: 'TeamAffinity',
  label: 'Team Affinity',
  map: config
};