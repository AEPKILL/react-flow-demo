import type { Node } from "@xyflow/react";
import type { StrategyFlowNodeTypeEnum } from "../enums/strategy-flow-node-type.enum";

export type StrategyFlowNode<T extends Record<string, unknown>> = Node<
	T,
	StrategyFlowNodeTypeEnum
>;

export type StrategyBaseInfoNodeData = {
	label: string;
};

export type StrategyBaseInfoNode = StrategyFlowNode<StrategyBaseInfoNodeData>;

export type AllStrategyFlowNode = StrategyBaseInfoNode;
