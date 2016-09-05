const express = require('express');
const auth = require('./server/config/auth');
const path = require('path');
const rootPath = path.normalize(__dirname + '/');

process.env.NODE_ENV = 'production';

const app = express();
const config = {
  db: 'mongodb://localhost/techservices',
  rootPath: rootPath,
  staticFiles: __dirname,
  appViews: './views/',
  port: process.env.PORT || 9005
};

require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);
require('./server/config/passport')();
app.use(require('./server/config/route'));

app.get('*', function (req, res) {
    res.render('index.html');
});

app.listen(config.port, function() {
    console.log('Express server 🌎  listening on port ' + config.port);
    console.log('env = ' + process.env.NODE_ENV +
                '\n__dirname = ' + __dirname +
                '\nprocess.cwd = ' + process.cwd());
});
