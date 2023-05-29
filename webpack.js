require('dotenv/config');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');


module.exports = {
  mode: 'production',
  entry: './client/bundle.js',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff(2)?|ttf|eoty)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/fonts/'
            }
          }
        ]
      },
      {
        test: /\.(svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/icons/'
            }
          }
        ]
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].js',
  },
  devServer: {
    contentBase: './build',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        default: false,
        vendors: false,
        vendor: {
          // sync + async chunks
          name: 'vendor',
          chunks: 'all',
          // import file path containing node_modules
          test: /node_modules/,
        },
      },
    },
  },
  plugins: [
    new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': `"${process.env.NODE_ENV}"`,
          'DEV_HOST': `"${process.env.DEV_HOST}"`,
          'PROD_HOST': `"${process.env.PROD_HOST}"`,
          'DEV_PORT': `"${process.env.DEV_PORT}"`,
          'PROD_PORT': `"${process.env.PROD_PORT}"`
      }
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'client/index.html',
    }),
  ],
};
