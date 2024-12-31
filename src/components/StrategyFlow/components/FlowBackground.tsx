import { Background, BackgroundVariant } from "@xyflow/react";

export interface FlowBackgroundProps {
	gap: number;
	size: number;
}

export default function FlowBackground({ gap, size }: FlowBackgroundProps) {
	return (
		<>
			<Background
				variant={BackgroundVariant.Dots}
				size={size / 2}
				gap={gap / 2}
				offset={[gap, gap]}
				color="#c2cdd8"
				id="1"
			/>
			<Background
				variant={BackgroundVariant.Dots}
				size={size}
				gap={gap}
				color="#c2cdd8"
				id="2"
			/>
		</>
	);
}
