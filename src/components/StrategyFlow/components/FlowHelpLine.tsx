import { useReactFlow, type Node } from "@xyflow/react";
import { useRef } from "react";

export interface FlowHelpLineProps {
	lineColor?: string;
	lineWidth?: number;
	snapDistance?: number;
}

export default function FlowHelpLine({
	lineColor = "#fc3d09",
	lineWidth = 1,
	snapDistance = 10,
}: FlowHelpLineProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	return (
		<canvas
			ref={canvasRef}
			className="absolute pointer-events-none w-full h-full"
		/>
	);
}
