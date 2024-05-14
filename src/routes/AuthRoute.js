import express from "express";
import { 
    getUser, 
    login
} from "../controllers/AuthController.js";

const route = express.Router();

route.post('/login', login);
route.get('/user', getUser);

export default route;