export interface FlowToolbarProps {
	children: React.ReactNode;
}

export default function FlowToolbar({ children }: FlowToolbarProps) {
	return <div className="h-full w-full bg-white">{children}</div>;
}
