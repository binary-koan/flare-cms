const path = require("path")

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: ["babel-plugin-macros"],
            presets: ["@babel/preset-react", "@babel/preset-typescript"]
          }
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    historyApiFallback: true
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  }
}
