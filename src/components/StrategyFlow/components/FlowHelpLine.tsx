import { useReactFlow } from "@xyflow/react";
import { useEffect, useLayoutEffect, useRef } from "react";

export interface FlowHelpLineProps {
	lineColor?: string;
	lineWidth?: number;
	snapDistance?: number;

	verticalLines?: number[];
	horizontalLines?: number[];

	width?: number;
	height?: number;
}

export default function FlowHelpLine({
	lineColor = "#fc3d09",
	lineWidth = 2,
	width,
	height,
	verticalLines,
	horizontalLines,
}: FlowHelpLineProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const { getViewport } = useReactFlow();

	useLayoutEffect(() => {
		if (!canvasRef.current) return;
		if (width === void 0 || height === void 0) return;
		canvasRef.current.width = width * window.devicePixelRatio;
		canvasRef.current.height = height * window.devicePixelRatio;
	}, [width, height]);

	useEffect(() => {
		if (!canvasRef.current) return;
		const context = canvasRef.current.getContext("2d");
		if (!context) return;
		if (width === void 0 || height === void 0) return;
		const { zoom, x, y } = getViewport();

		context.strokeStyle = lineColor;
		context.lineWidth = lineWidth;
		context.clearRect(0, 0, width, height);

		context.beginPath();

		for (const horizontalLine of horizontalLines || []) {
			context.moveTo(0, horizontalLine * zoom + y);
			context.lineTo(width, horizontalLine * zoom + y);
		}
		for (const verticalLine of verticalLines || []) {
			context.moveTo(verticalLine * zoom + x, 0);
			context.lineTo(verticalLine * zoom + x, height);
		}
		context.stroke();
	}, [
		getViewport,
		lineColor,
		lineWidth,
		width,
		height,
		horizontalLines,
		verticalLines,
	]);

	return (
		<canvas
			ref={canvasRef}
			className="absolute pointer-events-none inset-0 z-10"
		/>
	);
}
