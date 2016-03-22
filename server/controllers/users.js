var User = require('mongoose').model('User');


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

// exports.getAllUsers = function(req, res) {
//     var status = req.params.status;
//
//     User
//         .find({})
//         .select({fullname : 1, username : 1,  "_id" : 0})
//         .sort({TKTarg : 1})
//         .exec(function(err, collection) {
//           var users = collection.map(function(user) {
//             let userObj = { value: user.username, label: user.fullname}
//             return userObj;
//           });
//         res.send(users);
//     });
// };
