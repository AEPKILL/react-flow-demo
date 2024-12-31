import { ReactFlowProvider } from "@xyflow/react";

export default function withReactFlow<T extends {}>(
	Component: React.ComponentType<T>,
) {
	return function WithReactFlow(props: T) {
		return (
			<ReactFlowProvider>
				<Component {...props} />
			</ReactFlowProvider>
		);
	};
}
