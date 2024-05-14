import express from "express";
import { 
    createNote,
    deleteNote,
    getNoteById,
    getNotes,
    updateNote,
} from "../controllers/NotesController.js";

const route = express.Router();

route.get('/notes', getNotes);
route.post('/note', createNote);
route.get('/note/:id', getNoteById);
route.patch('/note/:id', updateNote);
route.delete('/note/:id', deleteNote);

export default route;
