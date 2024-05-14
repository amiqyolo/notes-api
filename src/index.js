import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import FileUpload from "express-fileupload";
import SequelizeStore from "connect-session-sequelize";
import session from "express-session";
import NotesRoute from "./routes/NotesRoute.js";
import UsersRoute from "./routes/UsersRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import db from './config/Database.js';
import Notes from "./models/NotesModel.js";
dotenv.config(); // load .env file

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

// (async() => {
//     await db.sync();
// })();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto' // false to http, true for https
    }
}));
app.use(cors());
app.use(express.json());
app.use(FileUpload());
app.use(express.static('public'));
app.use(NotesRoute);
app.use(UsersRoute);
app.use(AuthRoute);

// Notes.sync();

// generate session table
// store.sync();

const listener = app.listen(5000, () => {
    console.log(`Server running in PORT ${listener.address().port}`);
});
