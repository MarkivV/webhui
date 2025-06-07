import Icon from "@/components/icon";
import "@/globals.css";
import { getLocale } from "next-intl/server";
import type { PropsWithChildren } from "react";
import { fontsVariables } from "@/lib/font";
import { cn } from "@/lib/utils";
import Providers from "@/providers";

export default async function RootLayout({ children }: PropsWithChildren) {
	const locale = await getLocale();

	return (
		<html lang={locale} suppressHydrationWarning>
			<body className={cn(fontsVariables, "font-sans")}>
				<Providers>
					<div className="flex flex-col min-h-screen">
						<main className="flex-1">{children}</main>
					</div>
				</Providers>
			</body>
		</html>
	);
}
