"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import { routers } from "@/routers";
import { usePathname } from "next/navigation";
import Link from "next/link";
import logo from "@/assets/icon.png";
import { Dropdown, ConfigProvider, App } from "antd";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const ProLayout = dynamic(
	() => import("@ant-design/pro-components").then((mod) => mod.ProLayout),
	{
		ssr: false,
	},
);

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const pathname = usePathname();
	return (
		<html lang="en">
			<title>Strategy Flow</title>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ProLayout
					fixSiderbar
					fixedHeader
					title="Flows"
					logo={logo.src}
					route={routers}
					location={{ pathname }}
					layout="mix"
					avatarProps={{
						src: "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
						size: "small",
						title: "admin",
						render: (props, dom) => {
							return (
								<Dropdown
									menu={{ items: [{ label: "退出登录", key: "logout" }] }}
								>
									{dom}
								</Dropdown>
							);
						},
					}}
					menuItemRender={(item, dom) => (
						<Link key={item.path} href={item.path || "/"}>
							{dom}
						</Link>
					)}
				>
					<ConfigProvider>
						<App>{children}</App>
					</ConfigProvider>
				</ProLayout>
			</body>
		</html>
	);
}
