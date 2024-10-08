import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    status: {type: String, required: true},
    user_Id: {type: mongoose.Schema.Types.ObjectId , required: true},
},{ timestamps: true ,versionKey:false});
const Task = mongoose.model('Task', taskSchema)
export default Task;