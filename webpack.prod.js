const path = require('path')
const glob = require('glob')
const compileTemplates = require('./utils/compile-templates.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const HtmlCriticalWebpackPlugin = require("html-critical-webpack-plugin");

const paths = {
  src: path.join(__dirname, 'src'),
  public: path.join(__dirname, 'public'),
  pages: path.join(__dirname, 'layouts/pages'),
}

module.exports = {
  mode: 'production',
  entry: {
    main: `${paths.src}/js/main.js`,
    bootstrap: `${paths.src}/js/bootstrap.js`,
  },
  output: {
    path: paths.public,
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
        {
          loader: MiniCssExtractPlugin.loader
        },
        {
          loader: 'css-loader',
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
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlCriticalWebpackPlugin({
      base: paths.public,
      src: 'index.html',
      dest: 'index.html',
      inline: true,
      minify: false,
      extract: false,
      width: 375,
      height: 565,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false,
    }),
    new PurgecssPlugin({
      paths: glob.sync(`${paths.pages}/**/*`,  { nodir: true }),
    }),
    ...compileTemplates(paths.pages),
    new StyleLintPlugin({
      files: `src/scss/**/*.scss`,
    }),
  ],
}
