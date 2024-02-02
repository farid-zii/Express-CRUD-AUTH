import express from 'express'
import fileUpload from 'express-fileupload'
import cors from 'cors'
import db from './config/database.js';
import productRouter from './router/ProductRoute.js'

const app = express();

//Cek database terhubung atau tidak
try {
     db.authenticate();
    console.log("Coneccted")
} catch (error) {
    console.log(error)
}

//Cors berfungsi agar api bisa dipakai di domain berbeda
app.use(cors());

//fileUpload untuk data bertipe file bisa diterima dan disimpan
app.use(fileUpload());

//Mengubah data API dari express ke json 
app.use(express.json());

//Memasukkan public sebagai default agar mudah memindahkan file
app.use(express.static("public"));

//route mengarahkan endpoint
app.use(productRouter);
 
//menentukan port backend, menjalankan fungsi console.log
app.listen(5000,()=>console.log("Server Running in port 5000"));