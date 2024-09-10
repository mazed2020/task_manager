import Task from "../model/task.model.js";
import User from "../model/users.model.js";
import taskModel from "../model/task.model.js";
import mongoose from "mongoose";

export const CreateTask = async (req, res) => {
   try
   {
       const requestBody = req.body;
       requestBody.user_Id=req.headers['user_id'];
      const data =await  Task.create(requestBody);
      return res.status(201).send({status: 'success', data: data});
   }catch (err){
       res.status(400).send({status:"fail", message: err.message});
   }

}

export const UpdateTaskStatus = async (req, res) => {
try{
    const requestBody = req.body;
    const user_id = req.headers['user_id'];
    const taskId=req.params.id;
    await Task.updateOne({"_id":taskId},requestBody);
    res.send({status:"success", message: "Task updated successfully"});
}catch(err){
    res.status(400).send({message:"update status failed"})
}
}

export const TaskListByStatus = async (req,res,next)=>{
 try{
     const user_id=req.headers['user_id'];
     const status=req.body['status'];
     const data=await Task.find({"status":status,"user_Id":user_id});
     if(data==null){
         return res.json({status:"fail","Message":"User not found"});
     }
     res.status(200).send({status: 'success', data: data});

 }catch(err){
     res.status(400).send({message:"Task ListByStatus fail",})
 }
}

export const DeleteTask = async (req, res) => {
    try {
        const id=req.params.id;
        const user_id=req.headers['user_id'];
        await Task.deleteOne({"_id":id,user_Id: user_id});
        res.send({status:"success",message:"Task Deleted successfully"});

    }catch (err){
        res.status(400).send({message:"fail to delete",})
    }
}

export const CountTask=async (req,res,next)=>{
    const userId=new mongoose.Types.ObjectId(req.headers['user_id']);
    const data=await  Task.aggregate(
         [
             {$match:{"user_Id":userId},},
             {
                 $group:{"_id":"$status",sum:{$count:{}}},
             }
         ]
    )
    res.status(201).json({status:"successully count ",data:data});
}

