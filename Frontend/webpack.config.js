const webpack = require('webpack');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const config = require('./helpers/getConfig.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const {
	createSassVars,
	iconSvgCssGeneratePlugin,
	iconSvgCssGeneratePluginBeforeRun,
} = require('./helpers/webpackConstruct.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
		styles: `./${config.src.styles}style.scss`,
        app: './src/index.tsx' // entry point for your React app
	},
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js']
    },
	output: {
		path: path.join(__dirname, `/dist`),
		filename: './js/[name].js',
		chunkFilename: './js/[name].chunk.js',
		assetModuleFilename: (pathData) => {
			const stripped = pathData.filename.replace('src', '');
			return stripped ? stripped : '[path][name][ext]';
		},
	},
    devtool: 'inline-source-map',
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist'),
		},
		watchFiles: ['src/assets/**/*.scss'],

		hot: true,
		devMiddleware: {
			writeToDisk: true,
		},
	},
    watchOptions: {
		ignored: new RegExp('icons-svg.scss'),
	},
	optimization: {
		runtimeChunk: 'single',
	},
    module: {
        rules: [
            {
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							additionalData: createSassVars(config),
						},
					},
					'webpack-import-glob-loader',
				],
			},
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                        }
                }
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ['ts-loader']
            },
            {
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[name][ext]',
				},
			}
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: [path.join(__dirname, config.basePath.dest)],
		}),
        new SVGSpritemapPlugin('src/assets/img/**/*.svg', {
			output: { filename: 'img/bg/icons-svg.svg' },
			sprite: { prefix: 'icon-' },
		}),
        new iconSvgCssGeneratePluginBeforeRun(),
		new iconSvgCssGeneratePlugin(),

        new webpack.DefinePlugin({
			NODE_ENV: process.env.NODE_ENV,
			...config,
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].css',
			chunkFilename: 'css/[id].css',
		}),
        new HTMLWebpackPlugin({
            template: './src/index.html'
        }),
        new CopyPlugin({
			patterns: [{ from: './src/assets/img', to: 'img' }],
		}),
    ],
}