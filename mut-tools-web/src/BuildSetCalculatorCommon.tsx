export interface BuildSetCalculatorSetItemProps {
  label: string;
  equivalent?: string;
}

export interface BuildSetCalculatorCategoryConfig {
  id: string;
  label: string;
  map: Map<string, BuildSetCalculatorSetConfig>;
}

export interface BuildSetCalculatorSetConfig {
  setName: string;
  requirements: BuildSetCalculatorSetItemProps[];
  builds: BuildSetCalculatorSetItemProps[];
}

export interface BuildSetCalculatorConfigMap {
  id: string;
  label: string;
  map: Map<string, string>;
  updateSelected: (key: string) => void;
}