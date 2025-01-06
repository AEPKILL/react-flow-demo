import { createContext } from "react";

export type StrategyFlowContextType = {
	width: number;
	height: number;
};

export const StrategyFlowContext = createContext<StrategyFlowContextType>({
	width: 0,
	height: 0,
});
