// var Chirp = require('mongoose').model('Chirp');
// var User = require('mongoose').model('User');

// exports.getAllChirps = function(req, res) {
//     Chirp.find({}).exec(function(err, collection) {
        
//         res.send(collection);
//     });
// };

// exports.createChirp = function(req, res) {
//     var chirp = req.body;
//     chirp.userId = req.body.id;
     
//     Chirp.create(chirp, function(err, chirped) {
//         if(err) {
//             res.status(400);
//             return res.send({reason:err.toString()});
//         }
        
//           Chirp.findById(chirped.id, function(err, collection) {
//              res.json(collection);
//           });
        
       
//     });
// };
