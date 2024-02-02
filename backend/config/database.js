import { Sequelize } from "sequelize";

//Menghubungkan express ke database
const db = new Sequelize('db_express_crud','root','',{
    host:"localhost",
    dialect:"mysql"
})

export default db;