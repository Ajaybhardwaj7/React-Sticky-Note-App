var webpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var path = require('path');
var config = require('./webpack.config');


var compiler = webpack(config);
var server = new webpackDevServer(compiler , {

	contentBase : 'public/',
	hot : true,
	publicPath : '/',
	stats : { colors : true}

});

server.listen(3000, 'localhost' , function(){console.log('The server has started at port 3000')})