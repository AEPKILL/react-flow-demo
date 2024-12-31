"use client";

import StrategyFlow from "@/components/StrategyFlow";
import useToggleFillScreen from "@/hooks/useToggleFillScreen";
import { PageContainer } from "@ant-design/pro-components";

export default function StrategyFlowPage() {
	return (
		<PageContainer>
			<StrategyFlow />
		</PageContainer>
	);
}
