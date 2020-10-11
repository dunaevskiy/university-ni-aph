const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const dirs = {
	dist: path.resolve(__dirname, 'dist'),
};

module.exports = {
	entry: './src/application/app.ts',
	mode: 'development',
	output: {
		path: dirs.dist,
		filename: 'app.bundle.js',
	},

	resolve: {
		extensions: ['.js', '.ts'],
	},

	devtool: 'inline-source-map',

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [
					{
						loader: 'file-loader',
					},
				],
			},
		],
	},

	devServer: {
		contentBase: dirs.dist,
		port: 9000,
	},

	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: 'src/templates/index.html',
		}),
	],
};
