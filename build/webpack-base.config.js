const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const cloudinary = path.join(process.cwd(), './libs/cloudinary-v2.0.min.js');

module.exports = {
  mode: 'none',
  devtool: 'inline-source-map',
  entry: {
    app: [path.resolve(process.cwd(), './libs/entry.ts')]
  },
  output: {
    path: path.resolve(process.cwd(), './dist'),
    filename: 'vue-schema-render.common.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.vue', '.ts', '.tsx', '.json'],
    alias: {
      cloudinary,
      '@': path.join(process.cwd(), './libs')
    },
    modules: ['node_modules']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: process.cwd(),
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
        }
      }
    ]
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new ProgressBarPlugin(),
    new VueLoaderPlugin(),
  ]
};