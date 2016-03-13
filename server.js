var express = require('express');
var env = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 9005;
require('./server/config/mongoose')();
var login = require('./server/config/login');
var logger = require('morgan');

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(logger('dev'));

app.use(express.static(__dirname + '/'));

app.use(login.routes);

app.use(require('./server/config/route'));

// Only load this middleware in dev mode (important).
if (app.get('env') === 'development') {
  const webpack = require('webpack');
  const webpackConfig = require('./webpack/common.config');
  const compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath,
  }));

    app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000,
  }));

}

app.get('*', login.required, function (req, res) {
    res.render('index', {
        user: login.safe(req.user)
    });
});

app.listen(port, function() {
    console.log('Express server 🌎 listening on port ' + port);
    console.log('env = ' + process.env.NODE_ENV +
                '\n__dirname = ' + __dirname +
                '\nprocess.cwd = ' + process.cwd());
});
