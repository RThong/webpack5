const { resolve } = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 指定node环境变量   让postcss对package.json中browserslist的不同环境做处理
// process.env.NODE_ENV = "development";

// "browserslist": {
//   "development": [
//     "last 1 chrome version"
//   ],
//   "production": [
//     ">0.01%"
//   ]
// }

module.exports = {
  // webpack v5中dev-server bug https://stackoverflow.com/questions/65034496/how-can-i-get-hot-reloading-hmr-running-with-webpack-5/65035442#65035442
  target: 'web',
  entry: './src/index.js',
  output: {
    filename: 'build.bundle.js',
    publicPath: './',
    path: resolve(__dirname, '../build'),
  },
  // 开发环境用eval-source-map  生产环境用source-map
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 创建style标签，将样式引入
          // "style-loader",
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // 打包后build中css资源地址需要加上
              publicPath: '../',
            },
          },
          // 将css文件整合到js中
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          // "style-loader",
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      // 其他选项
                    },
                  ],
                ],
              },
            },
          },
          'less-loader',
        ],
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[name].[contenthash:8].[ext]',
          outputPath: 'assets/images',
        },
      },
      {
        test: /\.html$/,
        // 处理html中的img图片
        loader: 'html-loader',
      },
      {
        test: /\.(eot|ttf|svg|woff|woff2)$/,
        // 处理图标
        loader: 'file-loader',
        options: {
          name: '[name].[contenthash:8].[ext]',
          outputPath: 'assets/icons',
        },
      },

      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // 压缩html
      // minify: {
      //   collapseWhitespace: true,
      //   removeComments: true,
      // },
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/index.css',
    }),
    new OptimizeCssAssetsWebpackPlugin(),
    new EslintWebpackPlugin({
      // Plugin options
      extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
      // formatter: require.resolve('react-dev-utils/eslintFormatter'),
      // eslintPath: require.resolve('eslint'),
      // context: paths.appSrc,
      // cache: true,
      // ESLint class options
      // cwd: paths.appPath,
      // resolvePluginsRelativeTo: __dirname,
      // baseConfig: {
      //   extends: [require.resolve('eslint-config-react-app/base')],
      //   rules: {
      //     ...(!hasJsxRuntime && {
      //       'react/react-in-jsx-scope': 'error',
      //     }),
      //   },
      // },
    }),
    new CleanWebpackPlugin(),
  ],
  mode: 'development',
  // mode: 'production',

  devServer: {
    contentBase: resolve(__dirname, 'build'),
    // 启动gzip压缩
    compress: true,
    port: 3000,
    open: true,
    hot: true,
  },
};
