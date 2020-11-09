import {
  SetCalculatorCategoryConfig,
  SetCalculatorSetConfig,
  SetCalculatorSetItemProps
} from '../SetCalculatorCommon';

const ID: string = 'The50';

interface ConfigDefinition {
  TF_81P: string;
  TF_82P: string;
  TF_83P: string;
  TF_91: string;
  TF_92: string;
  TF_93: string;
}

const IDS: ConfigDefinition = {
  TF_81P: `${ID}_91+ovr`,
  TF_82P: `${ID}_92+ovr`,
  TF_83P: `${ID}_93+ovr`,
  TF_91: `${ID}_91ovr`,
  TF_92: `${ID}_92ovr`,
  TF_93: `${ID}_93ovr`,
};

const LABELS: ConfigDefinition = {
  TF_81P: `81+ OVR Fresh Player`,
  TF_82P: `82+ OVR Fresh Player`,
  TF_83P: `83+ OVR Fresh Player`,
  TF_91: `91 OVR Stacked Player`,
  TF_92: `92 OVR Stacked Player`,
  TF_93: `93 OVR Stacked Player`,
};

const config: Map<string, SetCalculatorSetConfig> = new Map<string, SetCalculatorSetConfig>();

const setStackedConfig: (id: string, setName: string, freshLabel: string) => void =
  (id: string, setName: string, freshLabel: string) => {
    const requirements: SetCalculatorSetItemProps[] = [];
    const requirement: SetCalculatorSetItemProps = {
      label: freshLabel
    };

    for (let i = 0; i < 32; i++) {
      requirements.push(requirement);
    }

    config.set(id, {
      setName: setName,
      requirements: requirements,
      builds: [
        {
          label: setName
        }
      ]
    });
  };

setStackedConfig(IDS.TF_91, LABELS.TF_91, LABELS.TF_81P);
setStackedConfig(IDS.TF_92, LABELS.TF_92, LABELS.TF_82P);
setStackedConfig(IDS.TF_93, LABELS.TF_93, LABELS.TF_83P);

export const CATEGORY_CONFIG: SetCalculatorCategoryConfig = {
  id: 'The50',
  label: 'The 50',
  map: config
};