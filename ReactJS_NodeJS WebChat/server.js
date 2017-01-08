'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');

const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');
const compiler = webpack(webpackConfig);

let app = express();
const http = require('http').Server(app)
require('./server/socketio')(http)

// tell the app to look for static files in these directories
app.use(webpackMiddleware(compiler,{
	hot:true,
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


const authCheckMiddleware = require('./server/middlewares/auth-check')(config);
app.use('/mainChat', authCheckMiddleware);

// routes
const authRoutes = require('./server/routes/auth');

app.use('/auth', authRoutes);






//------get topics start-------------------------
const Twitter = require('twitter');

const client = new Twitter({
	consumer_key: 'QDe2HYIZ1Oxr5jOKAa1lrZX7t',
	consumer_secret: 'GvZ9POGfMTWvWSgOFBiKpZB832m6iAA2TE2qsM78xCIEg7I3gy',
	access_token_key: '809120341779972096-b72Loxj5yOUfejAx8MP3scH1IC60Tl5',
	access_token_secret: 'Qw50T3DhOsCu9fttejwaBKbEOtxi5n7evPyoE5e5TXVC3'
});

//get top topics from twitter
app.get('/trends', (req,res)=> {
	//params: is where on earth (WOEID)  https://dev.twitter.com/rest/reference/get/trends/place
	const params = {id: '2459115'};
	client.get('trends/place', params, function(error, tweets, response) {
		if (!error) {
			console.log(tweets[0]['trends']);
			res.json(tweets[0]['trends']);
		}else {
			console.error(err);
			res.json({});
		}
	});
});
//-------get topics end------------------------

// start the server
http.listen(3000, function() {
  console.log('Server is running on http://localhost:3000 or http://127.0.0.1:3000');
});



