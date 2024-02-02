import { Sequelize } from "sequelize";
import db from "../config/database";

const {DataType} = Sequelize;

const User = db.define('user',{
    name:DataType.STRING,
    email:DataType.STRING,
    password:DataType.STRING,
    refresh_token:DataType.TEXT
},{
    freezeTableName:true,
})

export default User;

(async()=>{
    await db.sync()
})();

