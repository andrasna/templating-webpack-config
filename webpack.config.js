const paths = require('./helpers/paths')
const compileTemplates = require('./helpers/compile-templates')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const HtmlCriticalWebpackPlugin = require("html-critical-webpack-plugin")

module.exports = (mode) => {
  const isDevMode = (mode === 'development') ? true : false
  const config = {}
  
  config.entry = {
    main: `${paths.assets}/js/main.js`,
    bootstrap: `${paths.assets}/js/bootstrap.js`,
  }

  config.output = {
    path: paths.dist,
    filename: '[name].js',
  }

  if (isDevMode) {
    config.devtool = 'eval-source-map' 

    config.watch = true

    config.devServer = {
      contentBase: paths.layouts,
      watchContentBase: true,
    }

    config.stats = {
      modules: false,
      assets: false,
      hash: false,
      children: false,
      entrypoints: false,
    }
  }

  config.module = {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          ...(!isDevMode ? [
            MiniCssExtractPlugin.loader
          ] : []),
          ...(isDevMode ? [
          'style-loader'
          ] : []),
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
          },
        ],
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
  }

  config.plugins = [
    ...(!isDevMode ? [
      new CleanWebpackPlugin(),
      ...compileTemplates(paths.pages),
      new HtmlCriticalWebpackPlugin({
        base: paths.dist,
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
    ] : [
      ...compileTemplates(paths.pages),
      new StyleLintPlugin({
        context: `${paths.site}/assets/scss`,
        files: `**/*.scss`,
      }),
    ]),
  ]

  return config
}
