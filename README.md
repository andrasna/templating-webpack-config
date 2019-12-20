# How to use 

This project focuses on bootstrap theming and handlebars templating. Use it as an example. It may help you configure some of the packages utilized in this setup.

## Install npm packages

`npm install`

## Run the dev server

`npm start`

 Go to http://localhost:8080/

## Build

`npm run build`

## Features

- Handlebars templating
- Webpack Dev Server
- Webpack HMR for CSS
- Live reloading for template files
- Remove unused CSS on build
- Generate critical CSS on build 
- A starter CSS/JS for bootstrap theming
- CSS and JS linting during development and build
- Autoprefixer

## TODO

- The build process relies on the [html-critical-webpack-plugin](https://github.com/anthonygore/html-critical-webpack-plugin.git) and  [purgecss-webpack-plugin](https://github.com/FullHuman/purgecss-webpack-plugin.git) packages. Their integration into the build process has not been fully tested.
- Configuration for assets, like images.
- HMR for templates, if possible.
- Add `.browserslistrc`.
