const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/ShakaReact/index.tsx",
  output: {
    path: path.resolve(__dirname, "lib"),
    filename: "shaka-react.js",
    library: "ShakaReact",
    libraryTarget: "umd",
    publicPath: "/lib/",
    umdNamedDefine: true
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
        exclude: /node_modules/,
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
  externals: {
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react"
    },
    "react-dom": {
      root: "ReactDOM",
      commonjs2: "react-dom",
      commonjs: "react-dom",
      amd: "react-dom"
    }
  }
};
