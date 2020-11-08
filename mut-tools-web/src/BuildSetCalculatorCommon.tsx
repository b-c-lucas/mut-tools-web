export interface BuildSetCalculatorItemProps {
  label: string;
}

export interface BuildSetCalculatorConfig {
  setName: string;
  requirements: BuildSetCalculatorItemProps[];
  builds: BuildSetCalculatorItemProps[];
}

export interface BuildSetCalculatorConfigMap {
  map: Map<string, BuildSetCalculatorConfig>;
  updateSelected: (key: string) => void;
}