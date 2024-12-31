"use client";
import StrategyDashboard from "@/components/StrategyDashboard";
import { PageContainer } from "@ant-design/pro-components";
import { Result } from "antd";
export default function Home() {
	return (
		<PageContainer>
			<StrategyDashboard />
		</PageContainer>
	);
}
