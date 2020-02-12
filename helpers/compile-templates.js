const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function compileTemplates(pagesAbsPath) {
  const pages = []
  const fileNamesInDir = fs.readdirSync(pagesAbsPath)

  fileNamesInDir.forEach((fileName) => {
    if ((/\.hbs$/).test(fileName)) {
      const baseName = fileName.split('.')[0]

      pages.push(
        new HtmlWebpackPlugin({
          filename: `${baseName}.html`,
          template: `${pagesAbsPath}/${baseName}.hbs`,
          templateParameters: require('../site-data.json'),
        })
      )
    }
  })

  return pages
}

module.exports = compileTemplates
