import express from "express";
import { 
    getNotes,
} from "../controllers/NotesController.js";

const route = express.Router();

route.get('/notes', getNotes);

export default route;
