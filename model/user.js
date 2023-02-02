const mongoose = require("mongoose");
const schema = mongoose.Schema;


const UserSchema = new schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
});



module.exports = mongoose.model("User", UserSchema);