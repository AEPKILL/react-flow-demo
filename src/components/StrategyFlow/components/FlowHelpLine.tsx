import { type OnNodeDrag, useReactFlow, type Node } from "@xyflow/react";
import { useEffect, useRef, useState } from "react";
import { useFlowStore } from "../contexts/store.context";
import { useStore } from "zustand";
import { throttleTime } from "rxjs";
import type { AllStrategyFlowEdge } from "../types/edge.type";
import type { AllStrategyFlowNode } from "../types/node.type";
import { useMemoizedFn } from "ahooks";

export interface FlowHelpLineProps {
	lineColor?: string;
	lineWidth?: number;
	snapDistance?: number;
}

export default function FlowHelpLine({
	lineColor = "#fc3d09",
	lineWidth = 2,
	snapDistance = 10,
}: FlowHelpLineProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [canvasRect, setCanvasRect] = useState<DOMRect | null>(null);

	const { getViewport, getNodes, updateNode } = useReactFlow<
		AllStrategyFlowNode,
		AllStrategyFlowEdge
	>();

	const handleNodeDrag = useMemoizedFn(
		([event, node]: Parameters<OnNodeDrag<AllStrategyFlowNode>>) => {
			const { position: currentPosition, measured: currentMeasured } = node;
			const { x, y, zoom } = getViewport();

			if (!currentMeasured?.width || !currentMeasured?.height) return;
			if (!canvasRef.current) return;
			const context = canvasRef.current.getContext("2d");
			if (!context) return;

			const { width: canvasWidth, height: canvasHeight } =
				canvasRef.current.getBoundingClientRect();

			let horizontalSnap: number | null = null;
			const verticalSnap: number | null = null;
			const newX: number | null = null;
			let newY: number | null = null;

			const nodes = getNodes();

			for (const item of nodes) {
				if (item.id === node.id) continue;

				const { width: itemWidth = 0, height: itemHeight = 0 } =
					item.measured || {};

				// if (
				// 	Math.abs(item.position.y - itemHeight - currentPosition.y) <=
				// 	snapDistance
				// ) {
				// 	horizontalSnap = item.position.y;
				// }
				if (Math.abs(item.position.y - currentPosition.y) <= snapDistance) {
					horizontalSnap = item.position.y;
					newY = item.position.y;
				}

				// if (Math.abs(item.position.x + itemWidth - x) <= snapDistance) {
				// 	verticalSnap = item.position.x + itemWidth;
				// }
				// if (Math.abs(item.position.x - x) <= snapDistance) {
				// 	verticalSnap = item.position.x;
				// }
			}

			if (newY !== null) {
				updateNode(node.id, {
					position: {
						...node.position,
						y: newY,
					},
				});
			}

			console.log("clear");
			context.clearRect(0, 0, canvasWidth, canvasHeight);
			context.beginPath();

			console.log(x, y, zoom);
			console.log("currentPosition", currentPosition);
			console.log("currentMeasured", currentMeasured);
			console.log("horizontalSnap", horizontalSnap);
			console.log("verticalSnap", verticalSnap);

			context.strokeStyle = lineColor;
			context.lineWidth = lineWidth;

			if (horizontalSnap !== null) {
				context.beginPath();
				context.moveTo(0, horizontalSnap * zoom + y);
				context.lineTo(canvasWidth, horizontalSnap * zoom + y);
			}

			// context.beginPath();
			// context.moveTo(x + node.position.x * zoom, y + node.position.y * zoom);
			// context.lineTo(
			// 	// biome-ignore lint/style/noNonNullAssertion: <explanation>
			// 	x + (node.position.x + node.measured!.width!) * zoom,
			// 	y + node.position.y * zoom,
			// );

			// if (verticalSnap !== null) {
			// 	context.beginPath();
			// 	context.moveTo(verticalSnap * zoom, 0);
			// 	context.lineTo(verticalSnap * zoom, canvasHeight);
			// }

			context.stroke();
		},
	);

	const $nodeDrag = useStore(
		useFlowStore().observableStore,
		(state) => state.$nodeDrag,
	);

	useEffect(() => {
		const subscription = $nodeDrag
			.pipe(
				throttleTime(100, undefined, {
					trailing: true,
				}),
			)
			.subscribe(handleNodeDrag);
		return () => subscription.unsubscribe();
	}, [$nodeDrag, handleNodeDrag]);

	useEffect(() => {
		if (canvasRef.current) {
			setCanvasRect(canvasRef.current.getBoundingClientRect());
			new ResizeObserver(() => {
				// biome-ignore lint/style/noNonNullAssertion: <explanation>
				setCanvasRect(canvasRef.current!.getBoundingClientRect());
			}).observe(canvasRef.current);
		}
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className="absolute pointer-events-none w-full h-full z-10"
			width={canvasRect?.width}
			height={canvasRect?.height}
		/>
	);
}
