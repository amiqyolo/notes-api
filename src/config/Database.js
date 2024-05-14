import { Sequelize } from "sequelize";

const db = new Sequelize('notes.db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;