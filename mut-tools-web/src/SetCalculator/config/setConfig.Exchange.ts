import { clone } from './configHelpers';
import {
  SetCalculatorCategoryConfig,
  SetCalculatorSetConfig,
  SetCalculatorSetItemProps
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
  requirements: clone<SetCalculatorSetItemProps>({
    id: IDS.E_87_88,
    label: LABELS.E_87_88
  }, 3),
  builds: [
    {
      id: IDS.E_89_90,
      label: LABELS.E_89_90
    }
  ]
});

export const CATEGORY_CONFIG: SetCalculatorCategoryConfig = {
  id: ID,
  label: 'Exchange',
  map: config
};