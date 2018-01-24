const path = require('path');
const webpack = require('webpack');

const resolve = p => path.resolve(__dirname, p);

module.exports = {
  // Entry point for Webpack
  entry: './src/index.js',

  // Output build directory
  output: {
    path: path.join(__dirname, ''),
    filename: 'bundle.js',
  },

  resolve: {
    modules: [resolve('src'), resolve('node_modules')],
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        include: [resolve('src')],
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              camelCase: true,
              localIdentName: '[local]--[hash:base64:5]',
              importLoaders: 1,
            },
          },
          { loader: 'postcss-loader' },
        ],
      },
      {
        test: /\.css$/,
        include: [resolve('node_modules')],
        use: [
          { loader: 'style-loader' },
          { loader: 'postcss-loader' },
        ],
      },
      {
        test: /\.svg$/,
        use: 'svg-url-loader',
      },
      {
        test: /\.(jpe?g|pdf|gif|png|wav|mp3)$/,
        use: 'file-loader',
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: 'url-loader',
        include: [resolve('src')],
      },
      {
        // Run Babel transpiler on all .JS and .JSX files
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'react',
              'stage-2',
              ['env', {
                targets: {
                  browsers: ['last 2 Chrome versions'],
                }
              }],
            ],
          },
        },
      },
    ],
  },

  devServer: {
    hot: true,
    inline: true,
    historyApiFallback: true,
    proxy: {
      '/graphql': {
        target: 'http://localhost:8080',
      },
    }
  },

  plugins: [new webpack.HotModuleReplacementPlugin()],
};
