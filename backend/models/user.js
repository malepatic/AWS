const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = ({
    username : {type:String, required:true, unique:true},
    email : {type:String, required:true, unique:true},
    password : {type:String, required:true},
    role : {type:ObjectId, ref : "roles"}
})

const UserModel = mongoose.model("Users", UserSchema);

module.exports = {
    UserModel : UserModel
}