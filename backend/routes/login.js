require("dotenv").config();
const express = require("express");
const Router = express.Router;
const loginRouter = Router();
const { UserModel } = require("../models/user")
const { RoleModel } = require("../models/role")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const JWTSECRETKEY = process.env.JWTSECRETKEY;

loginRouter.post("/", async (req, res) => {
    const { username, password } = req.body;
    const findUser = await UserModel.findOne({
        username: username
    })
    if (!findUser) {
        res.status(403).send({
            message: "User not found"
        })
        return;
    }
    const checkPassword = await bcrypt.compare(password, findUser.password);
    const id = findUser.role;
    const role = await RoleModel.findOne({
        _id:id
    })
    if (checkPassword) {
        const token = jwt.sign({
            id: findUser._id,
            username: findUser.username,
        }, JWTSECRETKEY)
        res.status(200).json({
            token: token,
            role : role.roleName
        })
    }
    else {
        res.status(403).json({
            message: "Invalid credentials"
        })
    }
})


module.exports = {
    loginRouter: loginRouter
}