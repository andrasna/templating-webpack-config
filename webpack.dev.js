const path = require('path')
const compileTemplates = require('./utils/compile-templates.js')
const StyleLintPlugin = require('stylelint-webpack-plugin')

const paths = {
  src: path.join(__dirname, 'src'),
  public: path.join(__dirname, 'public'),
  pages: path.join(__dirname, 'layouts/pages'),
}

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  watch: true,
  devServer: {
    stats: 'minimal',
    contentBase: path.resolve(__dirname, './layouts'),
    watchContentBase: true,
    open: true,
  },
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
      files: './src/**/*.scss',
    }),
  ],
}
