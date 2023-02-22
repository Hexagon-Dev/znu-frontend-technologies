const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const pages = fs.readdirSync(path.resolve(__dirname, './src/pages'));
const template = path.resolve(__dirname, './src/template.html');

const htmlGenerators = pages.reduce((entries, componentName) => {
  entries.push(new HtmlWebpackPlugin({
    title: 'Hexagon-Dev',
    inject: true,
    filename: componentName,
    template,
    templateParameters: {
      content: fs.readFileSync(path.resolve(__dirname, `./src/pages/${componentName}`)),
    },
  }));
  return entries;
}, []);

module.exports = {
  mode: 'development',
  devServer: {
    hot: true,
    static: {
      directory: path.join(__dirname, 'public'),
    },
  },
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
  plugins: [
    ...htmlGenerators,
    new CleanWebpackPlugin(),
  ],
};
