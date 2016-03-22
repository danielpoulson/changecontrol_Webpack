var passport = require('passport');
var LocalStrategy = require('passport-local');
var User = require('mongoose').model('User');
var crypto = require('crypto');

function hash (password) {
    return crypto.createHash('sha512').update(password).digest('hex');
}

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

var router = require('express').Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true })); // Login Page
router.use(bodyParser.json()); // API
router.use(require('cookie-parser')());
router.use(require('express-session')({
    secret: 'p7r6uktdhmcgvho8o6e5ysrhxmcgjfkot7r6elu5dtjt7lirfyj',
    resave: false,
    saveUninitialized: true
}));
router.use(passport.initialize());
router.use(passport.session());

router.get('/login', function (req, res) {
    res.render('login.html');
});

router.post('/signup', function (req, res, next) {

    User.count({username: req.body.username }, function(err, count){
        if (err){console.log(err);}
        if (count === 0) {
            var userData = {
                fullname: req.body.fullname,
                email: req.body.email,
                username: req.body.username,
                passwordHash: hash(req.body.password),
                role: 'user'
            };

          User.create(userData, function(err, user) {
            if(err) {
                 res.redirect('/login');
              return res.send({reason:err.toString()});
            }


                passport.authenticate('local', function(err, user, info) {
                    if (err) { return next(err); }
                    if (!user) { return res.redirect('/login'); }
                    req.logIn(user, function(err) {
                      if (err) { return next(err); }
                      return res.redirect('/');
                    });
                  })(req, res, next);

          });


        } else {
            res.redirect('/login');
        }
    });


});

// TODO (DP): This update user function only changes the users password.
// Need to extend to allow for editing of role, email etc

router.put('/api/updateuser/:username', function (req, res, next) {
    const password = req.body.password;

    User.count({username: req.body.username }, function(err, count){
        if (err){console.log(err);}
        if (count === 1 && password) {
            const userData = {
                    username: req.body.username,
                    passwordHash: hash(password)
                };

             console.log("UserData");

          User.update({username : req.body.username}, {$set: userData}, function (err) {
            if (err){console.log(err); res.sendStatus(500);}
            res.sendStatus(200);
          });


        }
    });
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/login');
});

function loginRequired (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login');
    }
}

function makeUserSafe (user) {
    var safeUser = {};

    var safeKeys = ['id', 'fullname', 'email', 'username', 'dept', 'role'];

    safeKeys.forEach(function (key) {
        safeUser[key] = user[key];
    });
    return safeUser;
}

router.get('/api/users', function (req, res) {
    User.find({}).exec(function(err, collection) {
        res.json(collection.map(makeUserSafe));
    });

});

router.post('/api/follow/:id', function (req, res) {
    var id = req.params.id;

    if (req.user.following.indexOf(id) < 0) {
        req.user.following.push(id);

        User.findByIdAndUpdate({_id : req.user._id}, {$set: req.user}, function (err) {
            if (err) return handleError(err);
            res.json(makeUserSafe(req.user));
        });
    }
});

router.post('/api/unfollow/:id', function (req, res) {
    var id = req.params.id;
    var pos = req.user.following.indexOf(id);
    console.log(pos);

    if (pos > -1) {
        req.user.following.splice(pos, 1);

        User.findByIdAndUpdate({_id : req.user._id}, {$set: req.user}, function (err) {
            if (err) return handleError(err);
            res.json(makeUserSafe(req.user));
        });
    }
});

exports.routes = router;
exports.required = loginRequired;
exports.safe = makeUserSafe;
