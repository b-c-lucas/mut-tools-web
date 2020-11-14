import { clone } from './configHelpers';
import {
  SetCalculatorCategoryConfig,
  SetCalculatorSetConfig,
  SetCalculatorSetItemProps
} from '../SetCalculatorCommon';

const ID: string = 'UltimateKickoff';

interface ConfigDefinition {
  UK_88: string;
  UK_90: string;
}

const IDS: ConfigDefinition = {
  UK_88: `${ID}_88ovr`,
  UK_90: `${ID}_90ovr`,
};

const LABELS: ConfigDefinition = {
  UK_88: '88 OVR Hero',
  UK_90: '90 OVR Master'
};

const config: Map<string, SetCalculatorSetConfig> = new Map<string, SetCalculatorSetConfig>();

config.set(IDS.UK_90, {
  setName: LABELS.UK_90,
  requirements: clone<SetCalculatorSetItemProps>({
    id: IDS.UK_88,
    label: LABELS.UK_88
  }, 4),
  builds: [
    {
      id: IDS.UK_90,
      label: LABELS.UK_90
    }
  ]
});

export const CATEGORY_CONFIG: SetCalculatorCategoryConfig = {
  id: ID,
  label: 'Ultimate Kickoff',
  map: config
};