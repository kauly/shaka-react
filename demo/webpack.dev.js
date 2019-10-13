const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "/dist")
  },
  resolve: {
    extensions: [".tsx", ".js", ".json", ".ts"],
    alias: {
      react: path.resolve(__dirname, "./node_modules/react"),
      "react-dom": path.resolve(__dirname, "./node_modules/react-dom")
    }
  },
  module: {
    rules: [
      { test: /\.(png|svg|jpg|gif)$/, loader: "file-loader" },
      {
        test: [/\.jsx?$/, /\.tsx?$/],
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/typescript", "@babel/react"]
          }
        }
      },
      { test: /\.css$/i, use: ["style-loader", "css-loader"] }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html"
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
