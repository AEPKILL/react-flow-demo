import type { Edge } from "@xyflow/react";

export type StrategyFlowEdge<T extends Record<string, unknown>> = Edge<T>;

export type AllStrategyFlowEdge = StrategyFlowEdge<{
	source: string;
	target: string;
}>;
