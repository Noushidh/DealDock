import User from "../models/userModel.js"
import bcrypt from "bcrypt"

export const login =async (req,res)=>{
    try{
    const{email,password}=req.body
    
    const hashedPassword = await bcrypt.hash(password,10)

    const user = await User.create({email,password:hashedPassword});

    res.status(201).json({success:true,message:"user registered successfully"})

    }catch(error){
      res.status(500).json({sucess:false})
    }

}

export default login