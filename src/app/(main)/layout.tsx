import "@/globals.css";
import type { PropsWithChildren } from "react";
import { fontsVariables } from "@/lib/font";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { GoogleAnalytics } from "@next/third-parties/google";

export default async function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en">
			<head>
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta
					name="apple-mobile-web-app-status-bar-style"
					content="black-translucent"
				/>
				<meta name="theme-color" content="#4c1d95" />
			</head>
			<body
				className={cn(
					fontsVariables,
					"font-sans min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900",
				)}
			>
				<div className="flex flex-col min-h-screen">
					<main className="flex-1">{children}</main>
					<Toaster />
				</div>
			</body>
			<GoogleAnalytics gaId="G-J2LGCN4V1Q" />
		</html>
	);
}
