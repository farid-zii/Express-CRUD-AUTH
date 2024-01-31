import { Sequelize } from "sequelize";

const db = new Sequelize('db_express_crud','root','',{
    host:"localhost",
    dialect:"mysql"
})

export default db;