var webpack = require('webpack');

module.exports = {
	context: __dirname + '',

	entry: [
	  './js/app.js'
	],

	output: {
		filename: 'bundle.js',
		path: __dirname
	},

	module: {
		loaders: [
			{
				test:/\.js.?/,
				loaders: [
					'jsx-loader?insertPragma=React.DOM&harmony'
				]
			}
		]
	},

	resolve: {
		modulesDirectories: ['components','utility','../node_modules']
	},

	devtool: 'cheap-source-map'
}