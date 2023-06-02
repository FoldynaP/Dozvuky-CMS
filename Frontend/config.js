const path = require('path');
const basePath = {
	src: 'src/',
	dest: 'dist/',
	assets: '../',
};

const src = {
	fonts: `${basePath.src}/assets/fonts/`,
	icons: `${basePath.src}/assets/img/bg/icons/`,
	iconsSVG: `${basePath.src}/assets/img/bg/icons-svg/`,
	images: `${basePath.src}/assets/img/`,
	styles: `${basePath.src}/assets/css/`,
};

const twigNamespaces = {
	images: src.images,
};

const dest = {
	fonts: `${basePath.dest}fonts/`,
	images: `${basePath.dest}img/`,
	styles: `${basePath.dest}css/`,
};

const assets = {
	fonts: `${basePath.assets}fonts/`,
	images: `${basePath.assets}img/`,
	scripts: `${basePath.assets}js/`,
	styles: `${basePath.assets}css/`,
};

const webpack = {
	stats: {
		colors: true,
		hash: false,
		timings: true,
		assets: true,
		chunks: false,
		chunkModules: false,
		modules: false,
		children: true,
		version: false,
	},
};

const mediaQueries = {
	breakpoints: {
		sm: '480px',
		md: '750px',
		lg: '1000px',
		xl: '1200px',
		xxl: '1400px',
	},
	rules: {
		webkit: '(-webkit-min-device-pixel-ratio: 0)',
		retina: '(-webkit-min-device-pixel-ratio: 2), (min--moz-device-pixel-ratio: 2), (-o-min-device-pixel-ratio: 2/1), (min-device-pixel-ratio: 2), (min-resolution: 192dpi), (min-resolution: 2dppx)',
	},
};

module.exports = {
	basePath,
	src,
	dest,
	assets,
	twigNamespaces,
	webpack,
	mediaQueries,
};
