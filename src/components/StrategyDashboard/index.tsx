import { Card, Col, Row, Statistic, Tag } from "antd";
import { Line } from "@ant-design/charts";
import { ProTable } from "@ant-design/pro-components";
import type { ProColumns } from "@ant-design/pro-components";

// 策略状态数据
const strategyStats = {
	published: 12,
	draft: 5,
	failed: 2,
	deleted: 1,
};

// 执行记录数据
const executionData = Array.from({ length: 30 }, (_, i) => {
	const date = new Date();
	date.setDate(date.getDate() - i);
	return {
		date: date.toISOString().split("T")[0],
		success: 50 + Math.floor(Math.random() * 10),
		failed: Math.floor(Math.random() * 10),
		running: Math.floor(Math.random() * 30),
		cancelled: Math.floor(Math.random() * 5),
		cancelling: Math.floor(Math.random() * 5),
	};
}).reverse();

// 表格数据
const tableData = Array.from({ length: 10 }, (_, i) => ({
	id: i + 1,
	name: `策略 ${i + 1}`,
	sandbox: Math.random() > 0.5,
	version: `v1.${i}`,
	status: ["running", "success", "failed", "cancelled"][
		Math.floor(Math.random() * 4)
	],
	executionTime: new Date().toISOString(),
}));

// 状态标签配置
const statusColors = {
	running: "processing",
	success: "success",
	failed: "error",
	cancelled: "default",
	cancelling: "warning",
};

// 表格列定义
const columns: ProColumns[] = [
	{
		title: "策略名称",
		dataIndex: "name",
	},
	{
		title: "沙盒模式",
		dataIndex: "sandbox",
		render: (sandbox) => (
			<Tag color={sandbox ? "orange" : "green"}>{sandbox ? "是" : "否"}</Tag>
		),
	},
	{
		title: "版本",
		dataIndex: "version",
	},
	{
		title: "执行状态",
		dataIndex: "status",
		render: (status) => (
			<Tag color={statusColors[status as keyof typeof statusColors]}>
				{status === "running" && "执行中"}
				{status === "success" && "成功"}
				{status === "failed" && "失败"}
				{status === "cancelled" && "已撤销"}
				{status === "cancelling" && "撤销中"}
			</Tag>
		),
	},
	{
		title: "执行时间",
		dataIndex: "executionTime",
		render: (time) => new Date(time as string).toLocaleString(),
	},
];

export default function StrategyDashboard() {
	return (
		<div style={{ padding: 24 }}>
			{/* 策略概括 */}
			<Row gutter={16}>
				<Col span={6}>
					<Card>
						<Statistic
							title="已发布策略"
							value={strategyStats.published}
							valueStyle={{ color: "#3f8600" }}
						/>
					</Card>
				</Col>
				<Col span={6}>
					<Card>
						<Statistic
							title="草稿策略"
							value={strategyStats.draft}
							valueStyle={{ color: "#faad14" }}
						/>
					</Card>
				</Col>
				<Col span={6}>
					<Card>
						<Statistic
							title="失败策略"
							value={strategyStats.failed}
							valueStyle={{ color: "#cf1322" }}
						/>
					</Card>
				</Col>
				<Col span={6}>
					<Card>
						<Statistic
							title="已删除策略"
							value={strategyStats.deleted}
							valueStyle={{ color: "#999" }}
						/>
					</Card>
				</Col>
			</Row>

			{/* 执行记录折线图 */}
			<Card title="执行记录趋势" style={{ marginTop: 24 }}>
				<Line
					data={executionData.flatMap((item) => [
						{ date: item.date, value: item.success, category: "成功" },
						{ date: item.date, value: item.failed, category: "失败" },
						{ date: item.date, value: item.running, category: "执行中" },
						{ date: item.date, value: item.cancelled, category: "已撤销" },
						{ date: item.date, value: item.cancelling, category: "撤销中" },
					])}
					xField={(d: { date: string }) => new Date(d.date)}
					yField="value"
					seriesField="category"
					colorField="category"
				/>
			</Card>

			{/* 当日分案概括表格 */}
			<Card title="当日分案概括" style={{ marginTop: 24 }}>
				<ProTable
					columns={columns}
					dataSource={tableData}
					search={false}
					pagination={{
						pageSize: 5,
					}}
					rowKey="id"
				/>
			</Card>
		</div>
	);
}
