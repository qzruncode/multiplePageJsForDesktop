const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const webpack = require("webpack");

console.log(WebpackManifestPlugin);

module.exports = {
  mode: "development", // development production none
  entry: {
    index: ["/src/index.js", "webpack-hot-middleware/client?path=/__yejiawei&timeout=10000&overlay=false&reload=true"],
    another: ["/src/another.js", "webpack-hot-middleware/client?path=/__yejiawei&timeout=10000&overlay=false&reload=true"],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      maxInitialRequests: 20,
      maxAsyncRequests: 20,
      minSize: 40,
    },
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "js/[name].js",
    publicPath: "/",
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      { test: /\.txt$/, use: "raw-loader" },
      { test: /\.css$/i, use: ["style-loader", "css-loader"] },
      { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: "asset/resource" },
      { test: /\.(woff|woff2|eot|ttf|otf)$/i, type: "asset/resource" },
      { test: /\.(csv|tsv)$/i, use: ["csv-loader"] },
      { test: /\.xml$/i, use: ["xml-loader"] },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./public/index.html", filename: "index.html", chunks: ['index'] }),
    new HtmlWebpackPlugin({ template: "./public/index.html", filename: "another.html", chunks: ['another'] }),
    new CleanWebpackPlugin(), // 清空dist目录
    new webpack.HotModuleReplacementPlugin(), // 开启HMR
    // new WebpackManifestPlugin(), // 生成原始文件和生成文件的映射清单
  ],
};
