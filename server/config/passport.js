const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('mongoose').model('User');
const crypto = require('crypto');

function hash (password) {
    return crypto.createHash('sha512').update(password).digest('hex');
}

module.exports = function() {
  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username, passwordHash: hash(password) }, function (err, user) {
                  if (user) {
                      done(null, user);
                  } else {
                      done(null, false);
                  }
              });
    }
  ));

  passport.serializeUser(function (user, done) {
      if(user) {
        done(null, user.id);
      }
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

};
