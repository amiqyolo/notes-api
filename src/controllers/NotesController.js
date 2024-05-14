import Notes from "../models/NotesModel.js";

export const getNotes = async(req, res) => {
    try {
        const response = Notes.findAll();
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}