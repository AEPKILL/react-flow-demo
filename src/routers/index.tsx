import type { ProLayoutProps } from "@ant-design/pro-components";
import { DashboardOutlined, SettingOutlined } from "@ant-design/icons";

export const routers: NonNullable<ProLayoutProps["route"]> = {
	path: "/",
	children: [
		{
			name: "控制台",
			path: "/",
			icon: <DashboardOutlined />,
		},
		{
			name: "策略配置",
			path: "/strategy-flow",
			icon: <SettingOutlined />,
		},
	],
};
