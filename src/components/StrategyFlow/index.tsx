import "@xyflow/react/dist/style.css";
import "./index.css";

import withReactFlow from "@/hoc/with-react-flow";
import { FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import {
	Background,
	BackgroundVariant,
	Controls,
	MiniMap,
	ReactFlow,
	useEdgesState,
	useNodesState,
} from "@xyflow/react";

import useToggleFillScreen from "../../hooks/useToggleFillScreen";
import FlowBackground from "./components/FlowBackground";
import FlowHelpLine from "./components/FlowHelpLine";

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

export default withReactFlow(function StrategyFlow() {
	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
	const { isFullscreen, toggleFullscreen, elementRef } = useToggleFillScreen();

	return (
		<ProCard
			split="vertical"
			bodyStyle={{
				height: isFullscreen ? "100vh" : "calc(100vh - 56px - 110px )",
			}}
			ref={elementRef}
		>
			<ReactFlow
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
				<FlowHelpLine />
				<MiniMap />
			</ReactFlow>
		</ProCard>
	);
});
