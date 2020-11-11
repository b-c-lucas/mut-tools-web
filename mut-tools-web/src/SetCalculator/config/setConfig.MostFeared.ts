import {
  SetCalculatorCategoryConfig,
  SetCalculatorSetConfig
} from '../SetCalculatorCommon';

interface ConfigDefinition {
  MF_85: string;
  MF_87: string;
  MF_90: string;
  MF_90_NAT: string;
  MF_92: string;
  MF_92PU: string;
}

const IDS: ConfigDefinition = {
  MF_85: 'MF_85ovr',
  MF_87: 'MF_87ovr',
  MF_90: 'MF_90ovr',
  MF_90_NAT: 'MF_90ovr_NAT',
  MF_92: 'MF_92ovr',
  MF_92PU: 'MF_powerupfor92ovr'
};

const LABELS: ConfigDefinition = {
  MF_85: '85 OVR Most Feared',
  MF_87: '87 OVR Most Feared',
  MF_90: '90 OVR Most Feared',
  MF_90_NAT: '90 OVR Most Feared NAT',
  MF_92: '92 OVR Most Feared',
  MF_92PU: 'PU for 92 OVR Most Feared'
};

const config: Map<string, SetCalculatorSetConfig> = new Map<string, SetCalculatorSetConfig>();

config.set(IDS.MF_90, {
  setName: LABELS.MF_90,
  requirements: [
    {
      label: LABELS.MF_87
    },
    {
      label: LABELS.MF_87
    },
    {
      label: LABELS.MF_85
    },
    {
      label: LABELS.MF_85
    }
  ],
  builds: [
    {
      label: LABELS.MF_90
    }
  ]
});

config.set(IDS.MF_92, {
  setName: LABELS.MF_92,
  requirements: [
    {
      label: LABELS.MF_90,
      equivalent: IDS.MF_90
    },
    {
      label: LABELS.MF_90,
      equivalent: IDS.MF_90
    },
    {
      label: LABELS.MF_87,
      equivalent: IDS.MF_87
    },
    {
      label: LABELS.MF_85,
      equivalent: IDS.MF_85
    }
  ],
  builds: [
    {
      label: LABELS.MF_92
    },
    {
      label: LABELS.MF_92PU
    },
    {
      label: LABELS.MF_90_NAT
    },
    {
      label: LABELS.MF_90_NAT
    }
  ]
});

export const CATEGORY_CONFIG: SetCalculatorCategoryConfig = {
  id: 'MostFeared',
  label: 'Most Feared',
  map: config
};