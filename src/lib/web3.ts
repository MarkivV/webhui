import { http, createConfig, injected } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

declare module "wagmi" {
	interface Register {
		config: typeof config;
	}
}

export const config = createConfig({
	chains: [mainnet, sepolia],
	ssr: true,
	connectors: [injected()],
	transports: {
		[mainnet.id]: http(),
		[sepolia.id]: http(),
	},
});
