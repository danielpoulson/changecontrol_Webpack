const express = require('express');
const auth = require('./server/config/auth');

process.env.NODE_ENV = 'production';
process.env.PORT = 9005;

const app = express();
const config = {
  db: 'mongodb://localhost/techservices'
};

require('./server/config/express')(app);
require('./server/config/mongoose')(config);
require('./server/config/passport')();
app.use(require('./server/config/route'));

app.get('*', function (req, res) {
    res.render('index.html');
});
/*eslint no-console: 0*/
app.listen(process.env.PORT, function() {
    console.log('Express server 🌎  listening on port' + process.env.PORT);
    console.log('env = ' + process.env.NODE_ENV +
                '\nprocess.cwd = ' + process.cwd());
});
