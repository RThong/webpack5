const { resolve } = require('path');
const { isDev, PROJECT_PATH } = require('./constants');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WebpackBar = require('webpackbar');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const getCssLoaders = (importLoaders) => [
  'style-loader',
  {
    loader: 'css-loader',
    options: {
      modules: {
        // css modules 设置class名称
        localIdentName: isDev ? '[name]__[local]' : '[local]_[hash:base64:8]',
      },
      sourceMap: isDev,
      importLoaders,
    },
  },
  {
    loader: 'postcss-loader',
    // 和webpack v4配置有所不同  https://webpack.js.org/loaders/postcss-loader/#config
    options: {
      postcssOptions: {
        ident: 'postcss',
        plugins: [
          'postcss-flexbugs-fixes',
          [
            'postcss-preset-env',
            {
              autoprefixer: {
                grid: true,
                flexbox: 'no-2009',
              },
              stage: 3,
            },

            // // 修复一些和 flex 布局相关的 bug
            // require('postcss-flexbugs-fixes'),
            // require('postcss-preset-env')({
            //   autoprefixer: {
            //     grid: true,
            //     flexbox: 'no-2009',
            //   },
            //   stage: 3,
            // }),
            // require('postcss-normalize'),
          ],
          'postcss-normalize',
        ],
      },
      sourceMap: isDev,
    },
  },
];

module.exports = {
  entry: {
    app: resolve(PROJECT_PATH, './src/index.tsx'),
  },
  output: {
    filename: `js/[name]${isDev ? '' : '.[hash:8]'}.js`,
    path: resolve(PROJECT_PATH, './dist'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        loader: 'babel-loader',
        options: { cacheDirectory: true },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: getCssLoaders(1),
      },
      {
        test: /\.less$/,
        use: [
          ...getCssLoaders(2),
          {
            loader: 'less-loader',
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
      // {
      //   test: /\.scss$/,
      //   use: [
      //     ...getCssLoaders(2),
      //     {
      //       loader: 'sass-loader',
      //       options: {
      //         sourceMap: isDev,
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.html$/,
        // 处理html中的img图片
        loader: 'html-loader',
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10 * 1024,
              name: '[name].[contenthash:8].[ext]',
              outputPath: 'assets/images',
            },
          },
        ],
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[contenthash:8].[ext]',
              outputPath: 'assets/fonts',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // https://github.com/webpack/webpack/issues/11997#issuecomment-727843458
    new HtmlWebpackPlugin({
      template: resolve(PROJECT_PATH, './public/index.html'),
      filename: 'index.html',
      cache: false, // 特别重要：防止之后使用v6版本 copy-webpack-plugin 时代码修改一刷新页面为空问题。
      minify: isDev
        ? false
        : {
            removeAttributeQuotes: true,
            collapseWhitespace: true,
            removeComments: true,
            collapseBooleanAttributes: true,
            collapseInlineTagWhitespace: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true,
            useShortDoctype: true,
          },
    }),
    // 拷贝公共静态资源
    new CopyPlugin({
      patterns: [
        {
          from: resolve(PROJECT_PATH, './public'),
          to: resolve(PROJECT_PATH, './dist'),
          toType: 'dir',
          // 将html copy进去会报错: Multiple assets emit different content to the same filename index.html
          globOptions: {
            ignore: ['**/index.html'],
          },
        },
      ],
    }),

    // 显示编译进度
    new WebpackBar({
      name: isDev ? '正在启动' : '正在打包',
      color: '#238636',
    }),

    // 编译时的 Typescirpt 类型检查
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: resolve(PROJECT_PATH, './tsconfig.json'),
      },
    }),
  ],

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};
