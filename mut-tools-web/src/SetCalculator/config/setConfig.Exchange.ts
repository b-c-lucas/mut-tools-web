import {
  SetCalculatorCategoryConfig,
  SetCalculatorSetConfig
} from '../SetCalculatorCommon';

const ID: string = 'Exchange';

interface ConfigDefinition {
  E_87_88: string;
  E_89_90: string;
}

const IDS: ConfigDefinition = {
  E_87_88: 'E_87-88_ovr',
  E_89_90: 'E_89-90_ovr',
};

const LABELS: ConfigDefinition = {
  E_87_88: '87-88 OVR Elite',
  E_89_90: '89-90 OVR Elite',
};

const config: Map<string, SetCalculatorSetConfig> = new Map<string, SetCalculatorSetConfig>();

config.set(IDS.E_89_90, {
  setName: LABELS.E_89_90,
  requirements: [
    {
      label: LABELS.E_87_88,
      equivalent: IDS.E_87_88
    },
    {
      label: LABELS.E_87_88,
      equivalent: IDS.E_87_88
    },
    {
      label: LABELS.E_87_88,
      equivalent: IDS.E_87_88
    }
  ],
  builds: [
    {
      label: LABELS.E_89_90
    }
  ]
});

export const CATEGORY_CONFIG: SetCalculatorCategoryConfig = {
  id: ID,
  label: 'Exchange',
  map: config
};