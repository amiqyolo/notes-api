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