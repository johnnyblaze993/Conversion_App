module.exports = {
	plugins: ["jsdom-quokka-plugin"],
	jsdom: {
		html: '<div id="root"></div>',
	},
	babel: {
		presets: [
			"@babel/preset-react",
			"@babel/preset-typescript",
			"@babel/preset-env",
		],
	},
	typescript: true,
};
