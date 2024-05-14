import express from "express";
import cors from "cors";
import FileUpload from "express-fileupload";
import NotesRoute from "./routes/NotesRoute.js";
import UsersRoute from "./routes/UsersRoute.js";
import db from './config/Database.js';

const app = express();

// (async() => {
//     await db.sync();
// })();

app.use(cors());
app.use(express.json());
app.use(FileUpload());
app.use(express.static('public'));
app.use(NotesRoute);
app.use(UsersRoute)

// Notes.sync();



const listener = app.listen(5000, () => {
    console.log(`Server running in PORT ${listener.address().port}`);
});
