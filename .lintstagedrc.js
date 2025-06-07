const biomeCommand = (filenames) =>
	`biome format --write ${filenames.join(" ")}`;

const typescriptCommand = (filenames) =>
	`bash -c tsc --pretty --noEmit --project tsconfig.json ${filenames.join(" ")}`;

module.exports = {
	"./src/**/*.{js,jsx,ts,tsx}": [
		biomeCommand,
		typescriptCommand,
	],
};
