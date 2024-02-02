import Product from '../models/ProductModel.js';
import path from "path";
import fs from "fs";

// Get All Product
export const getProduct = async (req,res)=>{
    
    try {
        const response = await Product.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getProductById = async(req, res)=>{
    try {
        const response = await Product.findOne({
            where:{
                id : req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const saveProduct = (req,res)=>{
    //cek jika file kosong maka kembalikan response status 400 dan pesan
    if(req.files === null)return res.status(400).json({msg:"No File Uploded"});

    const name = req.body.title; //Mendapatkan nama dari form
    const file = req.files.file; //Mendapatkan file
    const fileSize = file.data.length; //mendapatkan panjang/ukuran dari file
    const ext = path.extname(file.name); //mendatpkan extension file
    const filename = file.md5 + ext; //encrypsi file dengan md5 lalu tambahkan extension file 
    //req.protocol yaitu mendapatkan http atau https , //req.host mendapatkan nama aplikasi
    const url = `${req.protocol}://${req.get("host")}/images/${filename}`;//membuat link gambar
    const allowedType = ['.png','.jpg','.jpeg']; //Membuat array type file
    
    //cek tipe data yang diizinkan dan ubah semua ext menjadi huruf kecil
    //tanda ! yaitu menandakan tidak atau tidak mirip 
    if(!allowedType.includes(ext.toLowerCase())) return res.status(500).json({msg:"Invalid Images"});
    //cek data besar atau tidak dari 5 mb
    if(fileSize > 5000000) return res.status(422).json({msg:"Image must be less than 5 MB"});

    //Memindahkan file ke public/images
    
    file.mv(`./public/images/${filename}`, async(err)=>{
        if(err) return res.status(500).json({msg:err.message});

        try{
            await Product.create({name:name,image:filename,url:url});
            res.status(201).json({msg:"Product Created Successfuly"});
        }catch(error){
            console.log(error.message)
        }
    });

}

export const updateProduct = async(req,res)=>{
    const product =  Product.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!product)return res.status(404).json({msg:"Not Found"});

       let filename ="";
       if(req.files === null){
        filename = `${Product.image}`
       } else{
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        const filename = file.md5 + ext;
        const url = `${req.protocol}://${req.get("host")}/images/${filename}`;
        const allowedType = ['.png','.jpg','.jpeg'];
        
        if(!allowedType.includes(ext.toLowerCase())) return res.status(500).json({msg:"Invalid Images"});
        if(fileSize > 5000000) return res.status(422).json({msg:"Image must be less than 5 MB"});
        
        const filePath = `./public/images/${product.image}`
        fs.unlinkSync(filePath);

        file.mv(`./public/images/${filename}`,(err)=>{
            if(err)return res.status(500).json({msg:err.message})
        })
       }

       const name =req.body.title;
       const url = `${req.protocol}://${req.get("host")}/images/${filename}`;
       try {
            await Product.update({name:name,image:filename,url:url},{
                where:{
                    id : req.params.id
                }       
            })

            return res.status(200).json({msg:"Update Success"});
       } catch (error) {
        console.log(error);
       }
}

export const deleteProduct = async(req,res)=>{
    const product = await Product.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!product)return res.status(404).json({msg:"Not Found"});

    try {
        const fileName = `./public/images/${product.image}`;
        fs.unlinkSync(fileName);

        await product.destroy();

        return res.status(200).json({msg:"Succes Delete Product"})

    } catch (error) {
        console.log(error)
    }

}