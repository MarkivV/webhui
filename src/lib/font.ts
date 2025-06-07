import { Montserrat, Roboto } from "next/font/google";

const roboto = Roboto({
	subsets: ["latin"],
	variable: "--font-roboto",
	weight: ["300", "500", "700"],
});

const monserrat = Montserrat({
	subsets: ["latin"],
	variable: "--font-montserrat",
	weight: ["300", "500", "700"],
});

export const fontsVariables = [roboto.variable, monserrat.variable];
