import React from 'react';
import './App.css';
import { BuildSetCalculator } from './BuildSetCalculator';
import { BuildSetCalculatorConfig } from './BuildSetCalculatorCommon';
import { BuildSetCalculatorDropdown } from './BuildSetCalculatorDropdown';

const SET_CONFIG: Map<string, BuildSetCalculatorConfig> = new Map<string, BuildSetCalculatorConfig>();
SET_CONFIG.set('90_ovr_MF', {
  setName: '90 OVR Most Feared',
  requirements: [
    {
      label: '87 OVR Most Feared'
    },
    {
      label: '87 OVR Most Feared'
    },
    {
      label: '85 OVR Most Feared'
    },
    {
      label: '85 OVR Most Feared'
    }
  ],
  builds: [
    {
      label: '90 OVR Most Feared'
    }
  ]
});
SET_CONFIG.set('92_ovr_MF_WR', {
  setName: '92 OVR Most Feared WR',
  requirements: [
    {
      label: '90 OVR Most Feared'
    },
    {
      label: '90 OVR Most Feared'
    },
    {
      label: '87 OVR Most Feared'
    },
    {
      label: '85 OVR Most Feared'
    }
  ],
  builds: [
    {
      label: '92 OVR Most Feared Hero'
    },
    {
      label: 'Most Feared Hero\'s PU'
    },
    {
      label: '90 OVR Most Feared NAT'
    },
    {
      label: '90 OVR Most Feared NAT'
    }
  ]
});
SET_CONFIG.set('92_ovr_MF_RE', {
  setName: '92 OVR Most Feared RE',
  requirements: [
    {
      label: '90 OVR Most Feared'
    },
    {
      label: '90 OVR Most Feared'
    },
    {
      label: '87 OVR Most Feared'
    },
    {
      label: '85 OVR Most Feared'
    }
  ],
  builds: [
    {
      label: '92 OVR Most Feared Hero'
    },
    {
      label: 'Most Feared Hero\'s PU'
    },
    {
      label: '90 OVR Most Feared NAT'
    },
    {
      label: '90 OVR Most Feared NAT'
    }
  ]
});

export const BuildSetCalculatorPage: React.FC = () => {
  const [currentSetId, setCurrentSetId] = React.useState('');

  let buildSetCalculator = null;
  if (SET_CONFIG.has(currentSetId)) {
    const currentConfig = SET_CONFIG.get(currentSetId);
    if (currentConfig) {
      buildSetCalculator = <BuildSetCalculator
        setName={currentConfig.setName}
        requirements={currentConfig.requirements}
        builds={currentConfig.builds} />
    }
  }

  const onDropdownChange = React.useCallback((key: string) => setCurrentSetId(key), []);

  return (
    <React.Fragment>
      <BuildSetCalculatorDropdown map={SET_CONFIG} updateSelected={onDropdownChange} />
      <hr />
      {buildSetCalculator}
    </React.Fragment>
  );
};
