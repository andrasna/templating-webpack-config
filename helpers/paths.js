const path = require('path')

const paths = {
  assets: path.join(__dirname, '../site/assets'),
  dist: path.join(__dirname, '../dist'),
  layouts: path.join(__dirname, '../site/layouts'),
  pages: path.join(__dirname, '../site/layouts/pages'),
  site: path.join(__dirname, '../site'),
}

module.exports = paths
