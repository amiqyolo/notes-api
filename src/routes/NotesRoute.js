import express from "express";
import { 
    createNote,
    getNoteById,
    getNotes,
} from "../controllers/NotesController.js";

const route = express.Router();

route.get('/notes', getNotes);
route.post('/note', createNote);
route.get('/note/:id', getNoteById);

export default route;
