import User from "../models/UserModel";
import bcrypt from "bcrypt";


export const getUserAll = async(req,res)=>{
    try {
        const response = await User.findAll();
        res.status(200).json(response);
        
    } catch (error) {
        res.json(error.message)
    }
}

export const getUserById = async(req,res)=>{
    try {
        const response = await User.findOne({
            where:{
                id : req.params.id
            }
        })
        res.status().json(response);
    } catch (error) {
        console.log(error);
    }
}

export const register = async(req,res)=>{
    const {name,email,password,confirmPassword} = req.body;

    if(password !== confirmPassword)return res.status(500).json({msg:"Password & Confirm Password Beda"})
}