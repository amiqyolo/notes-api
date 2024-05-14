import Users from "../models/UsersModel.js";
import argon2 from "argon2";

export const login = async(req, res) => {
    const { email, password } = req.body;

    const user = await Users.findOne({
        where: {
            email: email
        }
    });

    if (!user) return res.status(404).json({message: "User not found"});

    const matchPassword = await argon2.verify(user.password, password);

    if (!matchPassword) return res.status(400).json({message: "Wrong password"});

    req.session.userId = user.uuid;

    const response = {
        uuid: user.uuid,
        name: user.name,
        email: user.email
    }

    res.status(200).json({data: response});
}

export const getUser = async(req, res) => {
    if (!req.session.userId) return res.status(401).json({message: "Please log in first"});

    const user = await Users.findOne({
        attributes: ['uuid', 'name', 'email'],
        where: {
            uuid: req.session.userId
        }
    });

    if (!user) return res.status(404).json({message: "User not found"});
    res.status(200).json({data: user});
}

export const logout = async(req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(400).json({msg: "Cannot log out"});
        res.status(200).json({msg: "Successfully logged out"})
    })
}