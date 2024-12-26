const express = require("express");
const Router = express.Router;
const roleRouter = Router();
const {RoleModel} = require("../models/role")

roleRouter.post("/create", async(req,res)=>{
    const roleName = req.body.roleName;
    const response = await RoleModel.create({
        roleName : roleName
    })
    res.status(200).json({
        message : "Role created"
    })
})

module.exports = {
    roleRouter : roleRouter
}