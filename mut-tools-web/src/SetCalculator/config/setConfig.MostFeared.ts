import {
  SetCalculatorCategoryConfig,
  SetCalculatorSetConfig
} from '../SetCalculatorCommon';

interface ConfigDefinition {
  MF_85: string;
  MF_87: string;
  MF_90: string;
  MF_92_WR: string;
  MF_92_RE: string;
}

const IDS: ConfigDefinition = {
  MF_85: '85_ovr_MF',
  MF_87: '87_ovr_MF',
  MF_90: '90_ovr_MF',
  MF_92_WR: '92_ovr_WR_MF',
  MF_92_RE: '92_ovr_RE_MF'
};

const LABELS: ConfigDefinition = {
  MF_85: '85 OVR Most Feared',
  MF_87: '87 OVR Most Feared',
  MF_90: '90 OVR Most Feared',
  MF_92_WR: '92 OVR Most Feared WR',
  MF_92_RE: '92 OVR Most Feared RE'
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

config.set(IDS.MF_92_WR, {
  setName: LABELS.MF_92_WR,
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
      label: LABELS.MF_92_WR
    },
    {
      label: `PU for ${LABELS.MF_92_WR}`
    },
    {
      label: `${LABELS.MF_90} NAT`
    },
    {
      label: `${LABELS.MF_90} NAT`
    }
  ]
});

config.set(IDS.MF_92_RE, {
  setName: LABELS.MF_92_RE,
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
      label: LABELS.MF_92_RE
    },
    {
      label: `PU for ${LABELS.MF_92_RE}`
    },
    {
      label: `${LABELS.MF_90} NAT`
    },
    {
      label: `${LABELS.MF_90} NAT`
    }
  ]
});

export const CATEGORY_CONFIG: SetCalculatorCategoryConfig = {
  id: 'MostFeared',
  label: 'Most Feared',
  map: config
};