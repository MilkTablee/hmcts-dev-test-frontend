const path = require('path');

const sourcePath = path.resolve(__dirname, 'src/main/assets/js');
const govukFrontend = require(path.resolve(__dirname, 'webpack/govukFrontend'));
const scss = require(path.resolve(__dirname, 'webpack/scss'));
const HtmlWebpack = require(path.resolve(__dirname, 'webpack/htmlWebpack'));

const devMode = process.env.NODE_ENV !== 'production';
const fileNameSuffix = devMode ? '-dev' : '.[contenthash]';
const filename = `[name]${fileNameSuffix}.js`;

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    hot: true, // Enable Hot Module Replacement
    open: true, // Automatically open the browser
  },
  plugins: [...govukFrontend.plugins, ...scss.plugins, ...HtmlWebpack.plugins],
  entry: path.resolve(sourcePath, 'index.ts'),
  mode: devMode ? 'development' : 'production',
  module: {
    rules: [
      ...scss.rules,
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'src/main/public/'),
    publicPath: '',
    filename,
  },
};
