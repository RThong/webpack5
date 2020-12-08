const { resolve } = require("path");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "build.bundle.js",
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
    ],
  },
  plugins: [],
  mode: "development",
  //   mode: "production",
};
