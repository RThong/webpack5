const { resolve } = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "build.bundle.js",
    publicPath: "./",
    path: resolve(__dirname, "../build"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: "url-loader",
        options: {
          limit: 8 * 1024,
          name: "[hash:10].[ext]",
        },
      },
      {
        test: /\.html$/,
        // 处理html中的img图片
        loader: "html-loader",
      },
      {
        test: /\.(eot|ttf|svg|woff|woff2)$/,
        // 处理html中的img图片
        loader: "file-loader",
        options: {
          name: "[hash:10].[ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  mode: "development",
  //   mode: "production",

  devServer: {
    contentBase: resolve(__dirname, "build"),
    // 启动gzip压缩
    compress: true,
    port: 3000,
    open: true,
  },
};
