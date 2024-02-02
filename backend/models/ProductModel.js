import { Sequelize } from "sequelize";
import db from '../config/database.js';

const {DataTypes} = Sequelize;

//Membuat tabel di database dengan nama product
const Product = db.define('product',{
    //Yang berisikan name,image,url yang bertipe varchar/string
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING
},{
    //Menetapkan nama table
    freezeTableName: true
});

export default Product;

//fungsi jika table belum ada maka akan di buatkan
(async()=>{
    await db.sync()
})();