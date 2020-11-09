import { SetCalculatorCategoryConfig } from '../SetCalculatorCommon';
import { CATEGORY_CONFIG as EXCHANGE_CONFIG } from './setConfig.Exchange';
import { CATEGORY_CONFIG as LEGENDS_CONFIG } from './setConfig.Legends';
import { CATEGORY_CONFIG as MOST_FEARED_CONFIG } from './setConfig.MostFeared';
import { CATEGORY_CONFIG as SUPERSTAR_MVPS_CONFIG } from './setConfig.SuperstarMVPs';
import { CATEGORY_CONFIG as TEAM_AFFINITY_CONFIG } from './setConfig.TeamAffinity';
import { CATEGORY_CONFIG as TEAM_OF_THE_WEEK_CONFIG } from './setConfig.TeamOfTheWeek';
import { CATEGORY_CONFIG as THE_50_CONFIG } from './setConfig.The50';
import { CATEGORY_CONFIG as ULTIMATE_KICKOFF_CONFIG } from './setConfig.UltimateKickoff';

const CATEGORY_CONFIG: Map<string, SetCalculatorCategoryConfig> = new Map<string, SetCalculatorCategoryConfig>();

[
    TEAM_AFFINITY_CONFIG,
    LEGENDS_CONFIG,
    TEAM_OF_THE_WEEK_CONFIG,
    THE_50_CONFIG,
    MOST_FEARED_CONFIG,
    SUPERSTAR_MVPS_CONFIG,
    ULTIMATE_KICKOFF_CONFIG,
    EXCHANGE_CONFIG
].forEach((config: SetCalculatorCategoryConfig) => CATEGORY_CONFIG.set(config.id, config));

export default CATEGORY_CONFIG;
