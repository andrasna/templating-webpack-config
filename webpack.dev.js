const path = require('path')
const compileTemplates = require('./utils/compile-templates.js')
const StyleLintPlugin = require('stylelint-webpack-plugin')

const paths = {
  assets: path.join(__dirname, 'assets'),
  dist: path.join(__dirname, 'dist'),
  pages: path.join(__dirname, 'layouts/pages'),
}

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  watch: true,
  devServer: {
    stats: 'minimal',
    contentBase: path.join(__dirname, 'layouts'),
    watchContentBase: true,
    open: true,
  },
  entry: {
    main: `${paths.assets}/js/main.js`,
    bootstrap: `${paths.assets}/js/bootstrap.js`,
  },
  output: {
    path: paths.dist,
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: function () {
              return [
                require('autoprefixer'),
              ];
            }
          }
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        }]
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
    ],
  },
  plugins: [
    ...compileTemplates(paths.pages),
    new StyleLintPlugin({
      failOnError: false,
      files: './assets/**/*.scss',
    }),
  ],
}
