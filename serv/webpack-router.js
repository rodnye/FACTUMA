/**
 * Only for Front Test !!
 * webpack dev server
 */

const cfg = require('../config.js')
const { Router } = require('express');
const router = Router();

const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

// plugin
webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
const compiler = webpack(webpackConfig);

// add to router
router.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.devServer.publicPath,
}));

// enable "webpack-hot-middleware"
router.use(webpackHotMiddleware(compiler));

module.exports = router;