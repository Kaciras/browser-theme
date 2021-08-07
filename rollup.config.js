const html = require("./rollup/html");
const alias = require("@rollup/plugin-alias");
const { minify } = require("html-minifier-terser");
const { terser } = require("rollup-plugin-terser");
const webpackConfig = require("./alias.idea");
const copy = require("./rollup/copy");
const postcss = require("./rollup/postcss");
const svg = require("./rollup/svg");
const asset = require("./rollup/asset");
const template = require("./rollup/template");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
	input: "new-tab/index.html",
	output: {
		format: "esm",
		dir: "dist",
	},
	plugins: [
		alias({
			entries: Object.entries(webpackConfig.resolve.alias)
				.map(e => ({ find: e[0], replacement: e[1] })),
		}),
		asset({
			loaders: [
				postcss, svg,
			],
			source: { include: ["**/*.css", "**/*.svg"] },
			url: { include: ["**/*.ico"] },
			resource: { include: "_$" },
		}),
		copy([
			{ from: "new-tab/global.css" },
			{ from: "manifest.json" },
			{
				from: "browser-polyfill.min.js",
				to: "browser-polyfill.js",
				context: "node_modules/webextension-polyfill/dist",
			},
		]),
		html(),
		template(),
		isProduction && terser(),
	],
};
