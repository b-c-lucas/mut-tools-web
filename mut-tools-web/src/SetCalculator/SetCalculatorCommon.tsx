export interface SetCalculatorSetItemProps {
  label: string;
  equivalent?: string;
}

export interface SetCalculatorCategoryConfig {
  id: string;
  label: string;
  map: Map<string, SetCalculatorSetConfig>;
}

export interface SetCalculatorSetConfig {
  setName: string;
  requirements: SetCalculatorSetItemProps[];
  builds: SetCalculatorSetItemProps[];
}

export interface SetCalculatorConfigMap {
  id: string;
  label: string;
  map: Map<string, string>;
  updateSelected: (key: string) => void;
}