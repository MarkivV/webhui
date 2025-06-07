"use client";

import Icon from "@/components/icon";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const DropdownTheme = () => {
	const [mounted, setMounted] = useState(false);
	const { resolvedTheme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	const toggleTheme = () => {
		setTheme(resolvedTheme === "dark" ? "light" : "dark");
	};

	if (!mounted) {
		return <Button variant="outline" size="icon" />;
	}

	return (
		<Button variant="outline" size="icon" onClick={toggleTheme}>
			{resolvedTheme === "light" ? (
				<Icon className="text-2xl" name="common/moon-waning-crescent" />
			) : (
				<Icon className="text-2xl" name="common/white-balance-sunny" />
			)}
		</Button>
	);
};

export default DropdownTheme;
