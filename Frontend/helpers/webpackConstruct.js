const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const fse = require('fs-extra');
const config = require('./getConfig.js');
const path = require('path');
const cheerio = require('cheerio');
const htmlparser2 = require('htmlparser2');
const consolidate = require('consolidate');

function myJsonToSassObject(varName, obj) {
	if (typeof obj === 'object') {
		const resultStrings = [];
		for (const key of Object.keys(obj)) {
			const value = obj[key];
			resultStrings.push(`${key}: '${value}'`);
		}
		return `${varName}: (${resultStrings.join(',')});`;
	}
	return `${varName}: '${obj}';`;
}

function createSassVars(config) {
	const { breakpoints = {}, rules = {}, breakpointsVars = {} } = config.mediaQueries;
	const varsObject = {
		...breakpointsVars,
		...rules,
		breakpoints,
		breakpointsVars,
		paths: config.assets,
	};
	const varsStrings = [];
	for (const key in varsObject) {
		varsStrings.push(myJsonToSassObject(`$${key}`, varsObject[key]));
	}
	return varsStrings.join('');
}

function listSvgs(dir) {
	var items = fs.readdirSync(dir);
	const files = [];
	for (const item of items) {
		const newPath = path.join(dir, item);

		if (fs.statSync(newPath).isDirectory()) {
			files.push(...listSvgs(newPath));
		} else if (newPath.endsWith('.svg')) {
			files.push(newPath);
		}
	}
	return files;
}

class iconSvgCssGeneratePlugin {
	apply(compiler) {
		compiler.hooks.watchRun.tap('iconSvgCssGeneratePlugin', (compilation) => {
			const svgFiles = listSvgs('./src/assets/img/bg/icons-svg');
			const viewBoxes = [];

			svgFiles.forEach((newFile) => {
				const svgFile = fs.readFileSync(newFile);

				const svgFileString = svgFile.toString();

				const dom = htmlparser2.parseDocument(svgFileString, {});
				const $ = cheerio.load(dom);

				const symbol = $('svg');
				const nameReplaced = newFile.replaceAll('\\', '/');
				const name = nameReplaced.split('/')[nameReplaced.split('/').length - 1].replace('.svg', '');
				const viewbox = symbol[0].attribs.viewbox;
				if (viewbox) {
					symbol.attr('viewBox', viewbox);
					symbol.removeAttr('viewbox');
				}

				let viewBox = symbol[0].attribs.viewBox;

				if (!viewBox) {
					viewBox = `0 0 ${symbol[0].attribs.width} ${symbol[0].attribs.height}`;
				}

				if (viewBox) {
					viewBox = viewBox.split(' ');
				}
				viewBoxes.push({
					name,
					width: viewBox && viewBox.length >= 2 ? viewBox[2] : 20,
					height: viewBox && viewBox.length >= 2 ? viewBox[2] : 20,
				});
			});

			consolidate.lodash(
				`${config.src.styles}tpl/icons-svg.css.tpl`,
				{
					glyphs: viewBoxes,
				},
				(err, html) => {
					if (html) {
						if (!fs.existsSync(`${config.src.styles}core/generated`)) {
							fs.mkdirSync(`${config.src.styles}core/generated`);
						}
						fs.writeFileSync(`${config.src.styles}core/generated/icons-svg.scss`, html);
					}
				},
			);
		});
	}
}

class iconSvgCssGeneratePluginBeforeRun {
	apply(compiler) {
		compiler.hooks.beforeRun.tap('iconSvgCssGeneratePlugin', (compilation) => {
			const svgFiles = listSvgs('./src/assets/img/bg');
			const viewBoxes = [];

			svgFiles.forEach((newFile) => {
				const svgFile = fs.readFileSync(newFile);

				const svgFileString = svgFile.toString();

				const dom = htmlparser2.parseDocument(svgFileString, {});
				const $ = cheerio.load(dom);

				const symbol = $('svg');
				const nameReplaced = newFile.replaceAll('\\', '/');
				const name = nameReplaced.split('/')[nameReplaced.split('/').length - 1].replace('.svg', '');
				const viewbox = symbol[0].attribs.viewbox;
				if (viewbox) {
					symbol.attr('viewBox', viewbox);
					symbol.removeAttr('viewbox');
				}

				let viewBox = symbol[0].attribs.viewBox;

				if (!viewBox) {
					viewBox = `0 0 ${symbol[0].attribs.width} ${symbol[0].attribs.height}`;
				}

				if (viewBox) {
					viewBox = viewBox.split(' ');
				}
				viewBoxes.push({
					name,
					width: viewBox && viewBox.length >= 2 ? viewBox[2] : 20,
					height: viewBox && viewBox.length >= 2 ? viewBox[2] : 20,
				});
			});

			consolidate.lodash(
				`${config.src.styles}tpl/icons-svg.css.tpl`,
				{
					glyphs: viewBoxes,
				},
				(err, html) => {
					if (html) {
						if (!fs.existsSync(`${config.src.styles}core/generated`)) {
							fs.mkdirSync(`${config.src.styles}core/generated`);
						}
						fs.writeFileSync(`${config.src.styles}core/generated/icons-svg.scss`, html);
					}
				},
			);
		});
	}
}

module.exports = {
	createSassVars,
	iconSvgCssGeneratePlugin,
	iconSvgCssGeneratePluginBeforeRun,
};
