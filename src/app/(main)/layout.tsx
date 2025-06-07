import "@/globals.css";
import type { PropsWithChildren } from "react";
import { fontsVariables } from "@/lib/font";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

export default async function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en">
			<body className={cn(fontsVariables, "font-sans")}>
				<div className="flex flex-col min-h-screen">
					<main className="flex-1">{children}</main>
					<Toaster />
				</div>
			</body>
		</html>
	);
}
