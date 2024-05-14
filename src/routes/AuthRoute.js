import express from "express";
import { 
    getUser, 
    login,
    logout
} from "../controllers/AuthController.js";

const route = express.Router();

route.post('/login', login);
route.get('/user', getUser);
route.delete('/logout', logout);

export default route;