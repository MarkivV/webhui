import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import { formats } from "./lib/i18n/config";
import QueryWrapper from "./query-provider";
import type { PropsWithChildren } from "react";
import { getMessages } from "next-intl/server";

const Providers = async ({ children }: PropsWithChildren) => {
	const messages = await getMessages();

	return (
		<QueryWrapper>
			<NextIntlClientProvider formats={formats} messages={messages}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
					themes={["light", "dark"]}
				>
					{children}
				</ThemeProvider>
			</NextIntlClientProvider>
		</QueryWrapper>
	);
};

export default Providers;
