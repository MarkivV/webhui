"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import type { PropsWithChildren } from "react";
import { config } from "@/lib/web3";

const queryClient = new QueryClient();

const QueryWrapper = ({ children }: PropsWithChildren) => {
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</WagmiProvider>
	);
};

export default QueryWrapper;
