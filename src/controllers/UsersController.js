import Users from "../models/UsersModel.js";
import argon2 from "argon2";

export const createUser = async(req, res) => {
    const { name, email, password, confPassword } = req.body;

    if (password !== confPassword) return res.status(400).json({message: "Confirmation password not match with password"});
    if (password === "" || password === null) return res.status(400).json({message: "Password has empty"});

    const hashPassword = await argon2.hash(password);

    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword
        })
        res.status(201).json({message: "Register is success"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}