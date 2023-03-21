// webpack config to create a bundle for main.js into pkg folder dist/main.js
const path = require('path');

module.exports = (env, argv) => {  
  return {
    entry: './src/main.js',
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
        }
      ]
    }
  }
};