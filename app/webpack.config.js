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
        test: /\.(png|svg|jpg|gif|woff|woff2)$/,
        use: ["file-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@src": path.resolve(__dirname, "src"),
      "@shared": path.resolve(__dirname, "../shared/src")
    }
  },
  devServer: {
    host: '0.0.0.0',
    contentBase: path.resolve(__dirname, "dist"),
    historyApiFallback: true
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/"
  }
}
