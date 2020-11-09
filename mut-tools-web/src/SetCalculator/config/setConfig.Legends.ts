import {
  SetCalculatorCategoryConfig,
  SetCalculatorSetConfig
} from '../SetCalculatorCommon';

const ID: string = 'LEGENDS';

interface ConfigDefinition {
  L_81: string;
  L_82: string;
  L_83: string;
  L_84: string;
  L_85: string;
  L_86: string;
  L_87: string;
  L_88: string;
  L_89: string;
  L_90: string;
  L_90B: string;
  L_91: string;
  L_91B: string;
  L_92B: string;
  L_93B: string;
}

const IDS: ConfigDefinition = {
  L_81: `${ID}_81ovr`,
  L_82: `${ID}_82ovr`,
  L_83: `${ID}_83ovr`,
  L_84: `${ID}_84ovr`,
  L_85: `${ID}_85ovr`,
  L_86: `${ID}_86ovr`,
  L_87: `${ID}_87ovr`,
  L_88: `${ID}_88ovr`,
  L_89: `${ID}_89ovr`,
  L_90: `${ID}_90ovr`,
  L_90B: `${ID}_90ovr_boss`,
  L_91: `${ID}_91ovr`,
  L_91B: `${ID}_91ovr_boss`,
  L_92B: `${ID}_92ovr_boss`,
  L_93B: `${ID}_93ovr_boss`,
};

const LABELS: ConfigDefinition = {
  L_81: '81 OVR Legend',
  L_82: '82 OVR Legend',
  L_83: '83 OVR Legend',
  L_84: '84 OVR Legend',
  L_85: '85 OVR Legend',
  L_86: '86 OVR Legend',
  L_87: '87 OVR Legend',
  L_88: '88 OVR Legend',
  L_89: '89 OVR Legend',
  L_90: '90 OVR Legend',
  L_90B: '90 OVR Boss Legend',
  L_91: '91 OVR Legend',
  L_91B: '91 OVR Boss Legend',
  L_92B: '92 OVR Boss Legend',
  L_93B: '93 OVR Boss Legend',
};

const config: Map<string, SetCalculatorSetConfig> = new Map<string, SetCalculatorSetConfig>();

config.set(IDS.L_93B, {
  setName: LABELS.L_93B,
  requirements: [
    {
      label: LABELS.L_91,
      equivalent: IDS.L_91
    },
    {
      label: LABELS.L_89,
      equivalent: IDS.L_89
    },
    {
      label: LABELS.L_87,
      equivalent: IDS.L_87
    },
    {
      label: LABELS.L_86,
      equivalent: IDS.L_86
    },
    {
      label: LABELS.L_85,
      equivalent: IDS.L_85
    }
  ],
  builds: [
    {
      label: LABELS.L_93B
    }
  ]
});

export const CATEGORY_CONFIG: SetCalculatorCategoryConfig = {
  id: ID,
  label: 'Legends',
  map: config
};