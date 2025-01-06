import "@xyflow/react/dist/style.css";
import "./index.css";

import { useEffect, useLayoutEffect, useState } from "react";
import { Subscription } from "rxjs";
import { useStore } from "zustand";

import withReactFlow from "@/hoc/with-react-flow";
import useToggleFillScreen from "@/hooks/useToggleFillScreen";
import { FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import {
	Controls,
	MiniMap,
	type OnNodesChange,
	applyNodeChanges,
	ReactFlow,
	useEdgesState,
	useNodesState,
} from "@xyflow/react";

import FlowBackground from "./components/FlowBackground";
import FlowHelpLine from "./components/FlowHelpLine";

import type { AllStrategyFlowNode } from "./types/node.type";
import type { AllStrategyFlowEdge } from "./types/edge.type";
import { useMemoizedFn } from "ahooks";
import calculateHelperLines from "./utils/helper-line.utils";
const initialNodes = [
	{
		id: "hidden-1",
		type: "input",
		data: { label: "Node 1" },
		position: { x: 250, y: 5 },
	},
	{ id: "hidden-2", data: { label: "Node 2" }, position: { x: 100, y: 100 } },
	// { id: "hidden-3", data: { label: "Node 3" }, position: { x: 400, y: 100 } },
	// { id: "hidden-4", data: { label: "Node 4" }, position: { x: 400, y: 200 } },
];

const initialEdges = [
	{ id: "hidden-e1-2", source: "hidden-1", target: "hidden-2" },
	{ id: "hidden-e1-3", source: "hidden-1", target: "hidden-3" },
	{ id: "hidden-e3-4", source: "hidden-3", target: "hidden-4" },
];

export default withReactFlow(function StrategyFlow() {
	const [rect, setRect] = useState<DOMRect>();
	const [nodes, setNodes] = useNodesState(
		initialNodes as AllStrategyFlowNode[],
	);
	const [edges, , onEdgesChange] = useEdgesState(initialEdges);
	const { isFullscreen, toggleFullscreen, elementRef } = useToggleFillScreen();
	const [horizontalLines, setHorizontalLines] = useState<number[]>();
	const [verticalLines, setVerticalLines] = useState<number[]>();

	const onNodesChange: OnNodesChange<AllStrategyFlowNode> = useMemoizedFn(
		(changes) => {
			setHorizontalLines(void 0);
			setVerticalLines(void 0);
			if (
				changes.length === 1 &&
				changes[0].type === "position" &&
				changes[0].dragging &&
				changes[0].position
			) {
				const snapResult = calculateHelperLines(changes[0], nodes);

				changes[0].position.x =
					snapResult.snapPosition.x ?? changes[0].position.x;
				changes[0].position.y =
					snapResult.snapPosition.y ?? changes[0].position.y;

				setHorizontalLines(snapResult.horizontals);
				setVerticalLines(snapResult.verticals);
			}
			setNodes(applyNodeChanges(changes, nodes));
		},
	);

	useLayoutEffect(() => {
		if (!elementRef.current) return;

		setRect(elementRef.current.getBoundingClientRect());

		const observer = new ResizeObserver(() => {
			if (!elementRef.current) return;
			setRect(elementRef.current.getBoundingClientRect());
		});

		observer.observe(elementRef.current);

		return () => {
			observer.disconnect();
		};
	}, [elementRef]);

	console.log("lines", verticalLines, horizontalLines);

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
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
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
				<FlowHelpLine
					horizontalLines={horizontalLines}
					verticalLines={verticalLines}
					width={rect?.width}
					height={rect?.height}
				/>
				<MiniMap />
			</ReactFlow>
		</ProCard>
	);
});
