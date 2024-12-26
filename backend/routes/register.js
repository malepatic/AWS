const express = require("express");
const Router = express.Router;
const registerRouter = Router();
const z = require("zod");
const {RoleModel} = require("../models/role")
const {UserModel} = require("../models/user")
const bcrypt = require("bcrypt");

registerRouter.post("/", async(req,res)=>{
    const {username, email, password, role} = req.body;
    const reqBody = z.object({
        username : z.string(),
        password : z.string().min(8),
        email : z.string().email()
    })
    const parsedData = reqBody.safeParse(req.body);
    if(!parsedData.success){
        res.status(403).json({
            "message" : "Incorrect format",
            "error" : parsedDataWithSuccess.error
        })
        return;
    }
    const findRole = await RoleModel.findOne({
        roleName : role
    })
    console.log(findRole)
    if(!findRole){
        res.status(403).json({
            message : "Role not found"
        })
        return;
    }
    const id = findRole._id;
    const hashedPassword = await bcrypt.hash(password, 10);
    try{
        const response = await UserModel.create({
            username : username, 
            email : email,
            password : hashedPassword,
            role : id
        })
        res.status(200).json({
            message : "User created succesfully"
        })
    }
    catch(e){
        res.status(403).json({
            message : "Unable to create user "+e
        })
    }
})


module.exports = {
    registerRouter : registerRouter
}