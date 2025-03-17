// webpack config to create a bundle for main.js into pkg folder dist/main.js
const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');

dotenv.config({ path: path.resolve(__dirname, '.env') });

const DATADOG_URL = process.env.DATADOG_URL;

module.exports = (env, argv) => {  
  return {
    entry: {
      main: './src/main.js',
      // popup: './src/popup.js',
    },
    output: {
      path: path.resolve(__dirname, 'pkg/dist'),
      filename: '[name].js',
      chunkFilename: '[name].[chunkhash].js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-transform-runtime']
            }
          }
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(svg|png)$/,
          type: "asset/resource",
        },
      ]
    },
  }
};