import Product from "../models/productModel.js"

export const AddProduct = async (req,res)=>{
    try{
     const {title,price,description} = req.body
     console.log(req.body)
     console.log(req.file)
     const product = await Product.create({title,price,description,image:req.file.path})
     res.status(201).json({success:true,message:"Product added successfully",product})
    }catch(error){
        res.status(500).json({success:false,message:error.message})
    }
}
