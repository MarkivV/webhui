"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Button } from "@/components/ui/button";

const ConnectWalletButton = () => {
	const { address, isConnected } = useAccount();
	const { connectors, connect } = useConnect();
	const { disconnect } = useDisconnect();

	if (isConnected) {
		return (
			<div className="flex gap-2 items-center">
				<Button>{address}</Button>
				<Button onClick={() => disconnect()}>Disconnect</Button>
			</div>
		);
	}

	const connector = connectors[0];

	return <Button onClick={() => connect({ connector })}>Connect Wallet</Button>;
};

export default ConnectWalletButton;
