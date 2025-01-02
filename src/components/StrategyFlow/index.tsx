import "@xyflow/react/dist/style.css";
import "./index.css";

import { useMemoizedFn } from "ahooks";
import { useEffect } from "react";
import { Subscription } from "rxjs";
import { useStore } from "zustand";

import withReactFlow from "@/hoc/with-react-flow";
import useToggleFillScreen from "@/hooks/useToggleFillScreen";
import { FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import {
	Controls,
	MiniMap,
	ReactFlow,
	useEdgesState,
	useNodesState,
} from "@xyflow/react";

import FlowBackground from "./components/FlowBackground";
import FlowHelpLine from "./components/FlowHelpLine";
import { useFlowStore, withFlowStore } from "./contexts/store.context";

import type { AllStrategyFlowNode } from "./types/node.type";
import type { AllStrategyFlowEdge } from "./types/edge.type";
const initialNodes = [
	{
		id: "hidden-1",
		type: "input",
		data: { label: "Node 1" },
		position: { x: 250, y: 5 },
	},
	{ id: "hidden-2", data: { label: "Node 2" }, position: { x: 100, y: 100 } },
	{ id: "hidden-3", data: { label: "Node 3" }, position: { x: 400, y: 100 } },
	{ id: "hidden-4", data: { label: "Node 4" }, position: { x: 400, y: 200 } },
];

const initialEdges = [
	{ id: "hidden-e1-2", source: "hidden-1", target: "hidden-2" },
	{ id: "hidden-e1-3", source: "hidden-1", target: "hidden-3" },
	{ id: "hidden-e3-4", source: "hidden-3", target: "hidden-4" },
];

export default withReactFlow(
	withFlowStore(function StrategyFlow() {
		const [nodes, , onNodesChange] = useNodesState(initialNodes);
		const [edges, , onEdgesChange] = useEdgesState(initialEdges);
		const { isFullscreen, toggleFullscreen, elementRef } =
			useToggleFillScreen();

		const { observableStore } = useFlowStore();
		const { $edgeChange, $nodeChange, $nodeDrag } = useStore(observableStore);

		useEffect(() => {
			const subscription = new Subscription();
			subscription.add($nodeChange.subscribe(onNodesChange));
			subscription.add($edgeChange.subscribe(onEdgesChange));
			return () => subscription.unsubscribe();
		}, [onNodesChange, onEdgesChange, $nodeChange, $edgeChange]);

		return (
			<ProCard
				split="vertical"
				bodyStyle={{
					height: isFullscreen ? "100vh" : "calc(100vh - 56px - 110px )",
				}}
				ref={elementRef}
			>
				<ReactFlow<AllStrategyFlowNode, AllStrategyFlowEdge>
					fitView
					nodes={nodes}
					edges={edges}
					onNodesChange={(node) => $nodeChange.next(node)}
					onEdgesChange={(node) => $edgeChange.next(node)}
					onNodeDrag={(...args) => $nodeDrag.next(args)}
					maxZoom={4}
					className="relative h-full  !bg-[#eef2f6]"
				>
					<Controls orientation="horizontal">
						<button
							type="button"
							className="react-flow__controls-button"
							onClick={toggleFullscreen}
						>
							{isFullscreen ? (
								<FullscreenExitOutlined className="cursor-pointer" />
							) : (
								<FullscreenOutlined className="cursor-pointer" />
							)}
						</button>
					</Controls>
					<FlowBackground gap={20} size={2} />
					<FlowHelpLine />
					<MiniMap />
				</ReactFlow>
			</ProCard>
		);
	}),
);
