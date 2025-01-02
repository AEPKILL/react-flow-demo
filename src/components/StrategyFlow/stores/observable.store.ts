import { Subject } from "rxjs";
import { create } from "zustand";
import type { AllStrategyFlowNode } from "../types/node.type";
import type { AllStrategyFlowEdge } from "../types/edge.type";
import type { EdgeChange, NodeChange, OnNodeDrag } from "@xyflow/react";

export interface ObservableStore {
	$nodeChange: Subject<NodeChange<AllStrategyFlowNode>[]>;
	$edgeChange: Subject<EdgeChange<AllStrategyFlowEdge>[]>;
	$nodeDrag: Subject<Parameters<OnNodeDrag<AllStrategyFlowNode>>>;
	$nodesChange: Subject<NodeChange<AllStrategyFlowNode>[]>;
}

export function createObservableStore() {
	return create<ObservableStore>(() => ({
		$nodeChange: new Subject<NodeChange<AllStrategyFlowNode>[]>(),
		$edgeChange: new Subject<EdgeChange<AllStrategyFlowEdge>[]>(),
		$nodeDrag: new Subject<Parameters<OnNodeDrag<AllStrategyFlowNode>>>(),
		$nodesChange: new Subject<NodeChange<AllStrategyFlowNode>[]>(),
	}));
}
