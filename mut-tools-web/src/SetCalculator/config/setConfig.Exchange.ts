import {
  SetCalculatorCategoryConfig,
  SetCalculatorSetConfig
} from '../SetCalculatorCommon';

interface ConfigDefinition {
}

const IDS: ConfigDefinition = {
};

const LABELS: ConfigDefinition = {
};

const config: Map<string, SetCalculatorSetConfig> = new Map<string, SetCalculatorSetConfig>();

export const CATEGORY_CONFIG: SetCalculatorCategoryConfig = {
  id: 'Legends',
  label: 'Legends',
  map: config
};