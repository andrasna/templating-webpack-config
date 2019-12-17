const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function compileTemplates(pagesAbsPath) {
  const pages = []
  const fileNamesInDir = fs.readdirSync(pagesAbsPath)
  fileNamesInDir.forEach((filename) => {
    const basename = filename.split('.')[0]
    pages.push(
      new HtmlWebpackPlugin({
        filename: `${basename}.html`,
        template: `${pagesAbsPath}/${basename}.hbs`,
        templateParameters: require('../site-data.json'),
      })
    )
  })

  return pages
}

module.exports = compileTemplates
