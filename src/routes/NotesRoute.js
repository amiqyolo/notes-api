import express from "express";
import { 
    createNote,
    getNotes,
} from "../controllers/NotesController.js";

const route = express.Router();

route.get('/notes', getNotes);
route.post('/note', createNote);

export default route;
