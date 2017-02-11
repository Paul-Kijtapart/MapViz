const path = require('path');
const webpack = require('webpack');

const SRC = path.resolve(__dirname, 'src');
const PUBLIC = path.resolve(__dirname, 'public');

module.exports = {
	entry: path.join(SRC, 'index.js'),
	output: {
		filename: 'index.js',
		path: PUBLIC
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			use: [{
				loader: 'babel-loader'
			}]
		}]
	}
};