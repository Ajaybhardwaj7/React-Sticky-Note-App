
var path = require('path');
var webpack = require('webpack');

module.exports = {

	entry : [  './src/main.js' ,
				'webpack/hot/dev-server',
    			'webpack-dev-server/client?http://localhost:3000/' ],
	output : {
		filename : 'bundle.js',
		path : path.join(__dirname  , 'public' , 'js')
		
	},
	//devtool: 'source-map',
	
	module : {
		loaders : [
			{
				test : /\.js$/,
				exclude : /(node_modules)/,
				loader : 'babel',
				query : {
					presets : [ 'react' , 'es2015']
				}
			},

			{
				test : /\.(png|jpg)$/,
				exclude : /(node_modules)/,
				loader : 'url-loader?limit=20000'
			},

			{
				test : /\.css$/,
				exclude : /(node_modules)/,
				loader : 'style-loader!css-loader'
			}
		]
	},

	plugins : [
		  new webpack.HotModuleReplacementPlugin()
		  /*new webpack.optimize.UglifyJsPlugin({
			      compress: {
			        warnings: false
			      }
			    }),*/
	]
}