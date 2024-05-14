import express from "express";
import { 
    createUser
} from "../controllers/UsersController.js";

const route = express.Router()

route.post('/user', createUser);

export default route;