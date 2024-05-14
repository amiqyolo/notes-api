import { where } from "sequelize";
import Notes from "../models/NotesModel.js";
import path from "path";
import fs from 'fs';

export const getNotes = async(req, res) => {
    try {
        const response = await Notes.findAll({
            attributes: ['uuid', 'title', 'content', 'image', 'url', 'updatedAt'],
        });
        res.status(200).json({data: response})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const createNote = async(req, res) => {
    if (req.files === null) return res.status(400).json({message: "No file attach"});

    const title = req.body.title;
    const content = req.body.content;
    const file = req.files.file;
    const fileSize = file.data.length;
    const extensionFile = path.extname(file.name);
    const fileName = file.md5 + extensionFile;
    const url = `${req.protocol}://${req.get('host')}/images/${fileName}`;
    const allowedType = ['.jpg', '.png', '.jpeg'];

    if (!allowedType.includes(extensionFile.toLowerCase())) return res.status(422).json({message: "Invalid type extension file"});
    if (fileSize > 5000000) return res.status(422).json({message: "Image must be less then 5MB"});

    file.mv(`./public/images/${fileName}`, async(err) => {
        if (err) return res.status(500).json({message: err.message});

        try {
            const response = await Notes.create({
                title: title,
                content: content,
                image: fileName,
                url: url
            });
            res.status(201).json({
                data: response,
                message: "Note has been created"
            });
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    });
}

export const getNoteById = async(req, res) => {
    try {
      const response = await Notes.findOne({
        attributes: ['uuid', 'title', 'content', 'image', 'url', 'updatedAt'],
        where: {
            uuid: req.params.id
        }
      });

      if (!response) return res.status(404).json({message: "Note data not found"});

      res.status(200).json({data: response});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const updateNote = async(req, res) => {
    const note = await Notes.findOne({
        where: {
            uuid: req.params.id
        }
    });

    if (!note) return res.status(404).json({message: "Note data not found"});

    let fileName = ""

    if (req.files === null) {
        fileName = note.image
    } else {
        const file = req.files.file;
        const fileSize = file.data.length;
        const extensionFile = path.extname(file.name);
        fileName = file.md5 + extensionFile;
        const allowedType = ['.jpg', '.png', '.jpeg'];

        if (!allowedType.includes(extensionFile.toLowerCase())) return res.status(422).json({message: "Invalid image type extension"});
        if (fileSize > 5000000) return res.status(422).json({message: "Image must be less then 5MB"});

        const filePath = `./public/images/${note.image}`;
        fs.unlinkSync(filePath);

        file.mv(`./public/images/${fileName}`, (err) => {
            if (err) return res.status(500).json({message: err.message});
        });
    }

    const title = req.body.title;
    const content = req.body.content;
    const url = `${req.protocol}://${req.get('hots')}/images/${fileName}`;

    try {
        await Notes.update({
            title: title,
            content: content,
            image: fileName,
            url: url
        }, {
            where: {
                uuid: req.params.id
            }
        });

        res.status(200).json({
            message: "Note has been updated"
        })
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}