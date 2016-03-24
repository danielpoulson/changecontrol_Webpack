var User = require('mongoose').model('User');

//This route is from the old login file not sure if it is still used
// router.get('/api/users', function (req, res) {
//     User.find({}).exec(function(err, collection) {
//         res.json(collection.map(makeUserSafe));
//     });
//
// });

exports.getAllUsers = function(req, res) {
    var status = req.params.status;

    User
        .find({})
        .select({fullname : 1, "_id" : 0})
        .sort({fullname : 1})
        .exec(function(err, collection) {

          var users = collection.map(function(user) {
            return user.fullname;
          });

          res.send(users);
    });
};

// TODO HIGH 3 This update user function only changes the users password.
// Need to extend to allow for editing of role, email etc
exports.updateUser = function (req, res, next) {
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
};


exports.getLoggedUser = function(req, res) {
  const user = {};
  user.fullname = req.user.fullname;
  user.userName = req.user.username;
  user.role = req.user.role;

  res.send(user);
};

exports.getUser = function(req, res) {
    var _id = req.params.id;

    User
        .find({})
        .select({fullname : 1, username: 1, role: 1})
        .where({fullname : _id})
        .exec(function(err, collection) {
          res.send(collection);
    });
};

exports.getUserEmail = function(user) {
  return User.find({fullname : user},{email:1, "_id" : 0});

};


exports.createUser = function (req, res, next) {

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
          exports.required = loginRequired;          });
                  })(req, res, next);

          });


        } else {
            res.redirect('/login');
        }
    });


};

function makeUserSafe (user) {
    var safeUser = {};

    var safeKeys = ['id', 'fullname', 'email', 'username', 'dept', 'role'];

    safeKeys.forEach(function (key) {
        safeUser[key] = user[key];
    });
    return safeUser;
}

exports.safe = makeUserSafe;
