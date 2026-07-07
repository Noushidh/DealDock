import User from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const login =async (req,res)=>{
    try{
    const{email,password}=req.body

    const user = await User.findOne({email})

    if(!user){
      return res.status(401).json({success:false,message:"invalid email or password"})
    }
    
   const isMatch = await bcrypt.compare(password,user.password)

   if(!isMatch){
    return res.status(401).json({sucess:false,message:"Invalid email or password"})
    }

    const token = jwt.sign(
      {
        id:user._id,
        email:user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn:"1d"
      }
    )
   console.log("JWT Token:", token);


   return res.status(200).json({success:true,message:"Login sucessful",user:{id:user._id,email:user.email},token})

    }catch(error){
      res.status(500).json({sucess:false})
    }

}

export const register = async (req,res)=>{
  try{
      const{email,password}=req.body

    const user = await User.findOne({email})

    if(user){
      return res.status(409).json({success:false,message:"user is exist"})
    }
    
    const hashedPassword = await bcrypt.hash(password,10)

    await User.create({email,password:hashedPassword});

    res.status(201).json({success:true,message:"user registered successfully"})
    
  }catch(error){
      res.status(500).json({success:false})

  }
}