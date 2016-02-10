var User = require('mongoose').model('User');

exports.getAllUsers = function(req, res) {
    var status = req.params.status;

    User
        .find({})
        .select({fullname : 1, username : 1,  "_id" : 0})
        .sort({TKTarg : 1})
        .exec(function(err, collection) {
          var users = collection.map(function(user) {
            let userObj = { value: user.username, label: user.fullname}
            return userObj;
          });
        res.send(users);
    });
};
