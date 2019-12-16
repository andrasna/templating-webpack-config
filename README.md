# How to use

## Dev server:

`npm start`

## Build

`npm run build`

## TODO

- The build process relies on the [html-critical-webpack-plugin](https://github.com/anthonygore/html-critical-webpack-plugin.git) and  [purgecss-webpack-plugin](https://github.com/FullHuman/purgecss-webpack-plugin.git) packages. Their integration into the build process has not been fully tested.
- Come up with a better management for webpack.dev.js and webpack.prod.js, to make sure shared settings are kept in sync. Probably create a general config file with the shared settings.
- Configuration for assets like images.
