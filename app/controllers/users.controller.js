import User from "../model/users.model.js";
import {tokenEncode} from "../utility/token.utility.js";
import err from "multer/lib/multer-error.js";


export const Registration=async (req,res,next)=>{
   try{
   const reqBody=req.body;
   const data= await User.create(reqBody);
   return res.json({status:"success","Message":"User registered successfully",
       data:data
   })

   }catch(err){
       res.status(400).send({message:"Registration failed.",
           error:err.message
       });
   }
}

export const Login=async (req,res,next)=>{
    const reqBody=req.body;
    const user=User.findOne(reqBody);
    if(!user){
        res.status(401).send({message:"Login failed.",})
    }
    const token=tokenEncode(user['email'], user['user._id']);
    res.send({status:"success",
        message:"Login successfully",
        data:token});
}



export const ProfileDetails=async (req,res,next)=>{
      res.send("auth ready");

}

export const ProfileUpdate=async (req,res,next)=>{
   return  res.status(201).json({message:"success ProfileUpdate successfully"});
}

export const EmailVerify=async (req,res,next)=>{
   return  res.status(201).json({message:"success EmailVerify successfully"});
}

export const CodeVerify=async (req,res,next)=>{
    res.status(201).json({message:"success CodeVerify successfully"});
}

export const ResetPassword=async (req,res,next)=>{
    res.status(201).json({message:"success ResetPassword successfully"});
}


