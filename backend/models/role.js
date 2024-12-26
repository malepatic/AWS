const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    roleName : {type:String, unique:true}
})

const RoleModel = mongoose.model("roles", RoleSchema);

module.exports = {
    RoleModel : RoleModel
}