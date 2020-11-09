import { BuildSetCalculatorCategoryConfig } from './BuildSetCalculatorCommon';
import { CATEGORY_CONFIG as MOST_FEARED_CONFIG } from './BuildSetCalculatorPageConfig.MostFeared';

const CATEGORY_CONFIG: Map<string, BuildSetCalculatorCategoryConfig> = new Map<string, BuildSetCalculatorCategoryConfig>();

CATEGORY_CONFIG.set(MOST_FEARED_CONFIG.id, MOST_FEARED_CONFIG);

export default CATEGORY_CONFIG;
