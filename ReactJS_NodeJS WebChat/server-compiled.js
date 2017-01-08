'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var config = require('./config');

var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackConfig = require('./webpack.config');
var compiler = webpack(webpackConfig);

var app = express();
var http = require('http').Server(app);
require('./server/socketio')(http);

// tell the app to look for static files in these directories
app.use(webpackMiddleware(compiler, {
	hot: true,
	publicPath: webpackConfig.output.publicPath,
	noInfo: true
}));
app.use(webpackHotMiddleware(compiler));
app.use(express.static('./server/static/'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// pass the passport middleware
app.use(passport.initialize());

// load models
require('./server/models')(config);
// load passport strategies
require('./server/passport')(config);

var authCheckMiddleware = require('./server/middlewares/auth-check')(config);
app.use('/mainChat', authCheckMiddleware);

// routes
var authRoutes = require('./server/routes/auth');
var apiRoutes = require('./server/routes/mainChat');
app.use('/auth', authRoutes);
app.use('/mainChat', apiRoutes);

// start the server
http.listen(3000, function () {
	console.log('Server is running on http://localhost:3000 or http://127.0.0.1:3000');
});
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(compiler, 'compiler', '/Users/zh355245849/WebChat/server.js');

	__REACT_HOT_LOADER__.register(app, 'app', '/Users/zh355245849/WebChat/server.js');

	__REACT_HOT_LOADER__.register(http, 'http', '/Users/zh355245849/WebChat/server.js');

	__REACT_HOT_LOADER__.register(authCheckMiddleware, 'authCheckMiddleware', '/Users/zh355245849/WebChat/server.js');
}();

;

//# sourceMappingURL=server-compiled.js.map