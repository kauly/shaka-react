const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "/dist")
  },
  resolve: {
    extensions: [".tsx", ".js", ".json", "ts"]
  },
  module: {
    rules: [
      {
        test: [/\.jsx?$/, /\.tsx?$/],
        use: "babel-loader",
        exclude: /node_modules/
      },
      { test: /\.css$/i, use: ["style-loader", "css-loader"] }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./dist/index.html"
    })
  ],
  devServer: {
    stats: {
      children: false,
      maxModules: 0
    },
    port: 3000
  }
};
