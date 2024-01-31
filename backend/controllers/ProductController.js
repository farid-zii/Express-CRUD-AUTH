import Product from '../models/ProductModel.js';
import path from "path";

export const getProduct = (res,req)=>{
    try {
        const response =  Product.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getProductById = (res,req)=>{
    try {
        const response =  Product.findOne({
            where:{
                id: req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const saveProduct = (res,req)=>{
    if(req.files == null)return res.status(400).json({msg:"No File Uploded"});

    const name = req.body.title;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const filename = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${filename}`;
    const allowedType = ['.png','.jpg','.jpeg'];
    
    if(!allowedType.includes(ext.toLowerCase())) return res.status(500).json({msg:"Invalid Images"});
    if(fileSize > 5000000) return res.status(422).json({msg:"Image must be less than 5 MB"});

    file.mv(`./public/images/${filename}`, async(err)=>{
        if(err) return res.status(500).json({msg:err.message});

        try{
            await Product.create({name:name,image:filename,url:url});
            res.status(201).json({msg:"Product Created Successfuly"});
        }catch(error){
            console.log(error.message)
        }
    })

}

export const updateProduct = (res,req)=>{
    
}

export const deleteProduct = (res,req)=>{
    
}