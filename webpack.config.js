const webpack = require('webpack');
const path = require('path');
const util = require('gulp-util');
const config = require('./gulp/config');
const Dotenv = require('dotenv-webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

function createConfig(env) {
  if (env === undefined) {
    env = process.env.NODE_ENV;
  }

  const isProduction = env === 'production';
  const mode = isProduction ? 'production' : 'development';
  const context = path.join(__dirname, config.src.js);
  const entry = {app: './app.js'};
  const outputPath = path.join(__dirname, config.dest.js);
  const publicPath = 'js/';
  const devtool = isProduction ? 'source-map' : 'eval-cheap-source-map';
  const plugins = [
    new Dotenv(),
    new webpack.NoEmitOnErrorsPlugin(),
  ];
  const resolve = {
    extensions: ['.js'],
  };
  const optimization = {minimize: isProduction};

  const webpackConfig = {
    mode,
    context,
    entry,
    output: {
      path: outputPath,
      filename: `[name].js`,
      publicPath,
    },
    devtool,
    plugins,
    resolve,
    optimization,
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules\/(?!(dom7|swiper)\/).*/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        }
      ],
    },
  };

  if (isProduction) {
    webpackConfig.plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true,
      }),
    );
    webpackConfig.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        analyzerPort: 4000,
        openAnalyzer: false,
      }),
    );
  }

  return webpackConfig;
}

module.exports = createConfig();
module.exports.createConfig = createConfig;
