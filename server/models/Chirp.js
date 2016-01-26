// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

// var chirpSchema = new Schema({
//     userId: String,
//     fullname: String,
//     username: String,
//     email: String,
//     text: String,
//     created_at    : { type: Date },
//     updated_at    : { type: Date }
// });

// chirpSchema.pre('save', function(next){
//   now = new Date();
//   this.updated_at = now;
//   if ( !this.created_at ) {
//     this.created_at = now;
//   }
//   next();
// });

// var Chirp = mongoose.model('Chirp', chirpSchema);
