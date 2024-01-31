import express from 'express'
import fileUpload from 'express-fileupload'
import cors from 'cors'
// import db from './config/database.js';
import router from './router/ProductRoute.js'

const app = express();

// try {
//      db.authenticate();
//     console.log("Coneccted")
// } catch (error) {
//     console.log(error)
// }

app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(router);

app.listen(5000,()=>console.log("Server Running in port 5000"));