const { merge } = require('webpack-merge');

const webpackConfig = require('../webpack.config.js');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(webpackConfig, {
	mode: 'production',
	entry: {
		app: './dist/js/app.js', // entry point for your React app
	  },
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin()],
		runtimeChunk: false,
	},

	devtool: false,
});
