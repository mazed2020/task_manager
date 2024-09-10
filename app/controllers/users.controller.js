import User from "../model/users.model.js";
import {tokenEncode} from "../utility/token.utility.js";
import err from "multer/lib/multer-error.js";
import {sendEmail} from "../utility/email.utility.js";
import * as readline from "node:readline";

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
    const data=await User.findOne(req.body);

    if(data==null){
        return res.json({status:"fail","Message":"User not found"})
    }
    else{
        // Login Success
        let token=tokenEncode(data['email'],data['_id'])
        return res.json({status:"success","Message":"User find successfully",
            data:token
        })
    }
}

export const ProfileDetails=async (req,res,next)=>{
    try{
        const user_id=req.headers['user_id'];
        const findUser=await  User.findOne({"_id":user_id});

        if(!findUser){
            res.status(401).send({message:"your are not authorized user.",})
        }
        res.send({status:"success",data:findUser});

    }catch (e) {
        res.status(401).send({message:"Profile not found",})
    }


}

export const ProfileUpdate=async (req,res,next)=>{
   const body=req.body;
   const user_id=req.headers['user_id'];
   await User.updateOne({"_id":user_id},body)
    res.send({status:"success", message: "Profile updated successfully"});
}

export const EmailVerify=async (req,res,next)=>{
const email=req.params.email;
const data=await User.findOne({email:email});
if(data==null){
    return res.json({status:"fail","Message":"Email not found",})
}else {
    let code=Math.floor(100000+Math.random()*900000);
    let EmailTo=data['email'];
    let EmailText="your code is "+code;
    let EmailSubject="task manager verification code";

   await sendEmail(EmailTo,EmailText,EmailSubject);
   await User.updateOne({"email":data['email']},{"otp":code});
   res.status(200).send({status:"success",message:"send verification code on your email  successfully"})
}


}

export const CodeVerify=async (req,res,next)=>{
    try{
        const body=req.body;
       const data= await User.findOne(body);
       if(data==null){
           res.status(401).send({message:"invalid otp code",})
       }else
       {
           res.status(201).json({status:"valid otp code",data:data});
       }

    }catch (err){
        res.status(400).send({message:"Code not found",})
    }
}

export const ResetPassword=async (req,res,next)=>{
    const reqBody=req.body;
    const user=await User.findOne({email: reqBody['email']});
    if(!user){
        res.status(401).send({message:"user not found",})
    }
    await User.updateOne({"email":user['email']},{password:reqBody['password'],otp:"0"});
    const data=await User.findOne(reqBody);
    res.status(201).json({status:"success",message:"reset password successfully",data:data})
}


