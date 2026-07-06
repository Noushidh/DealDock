

export const login = (req,res)=>{
    const{email,password}=req.body
    res.json({success:true})
}

export default login