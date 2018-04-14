const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    username: {
        required: true,
        unique: true,
        type: String
    },
    password: {
        type: String,
        required: true,
    }
})

// UserSchema.pre("save", function (next) {
//     bcrypt.hash(this.password, 10, (err, hash) => {
//         this.password = hash;
//         next();
//     });
// });

// schema.methods.comparePassword = function (candidatePassword: string): Promise<boolean> {
//     let password = this.password;
//     return new Promise((resolve, reject) => {
//         bcrypt.compare(candidatePassword, password, (err, success) => {
//             if (err) return reject(err);
//             return resolve(success);
//         });
//     });
// };

UserSchema.methods.comparePassword = function (password, cb) {
    if (password === this.password) {
        cb(null, true)
    } else {
        cb('err')
    }
}

module.exports = mongoose.model('User', UserSchema);