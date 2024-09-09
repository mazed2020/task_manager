export const CreateTask = async (req, res) => {
    return res.status(201).json({
        message: 'Task Created',
    })
}
export const UpdateTaskStatus = async (req, res) => {
    return res.status(200).json({
        message: 'Task Update',
    })
}
export const TaskListByStatus = async (req,res,next)=>{
    return res.status(200).json({
        message: 'Task ListByStatus',
    })
}
export const CountTask=async (req,res,next)=>{
    return res.status(200).json({
        message: 'Task List',
    })
}
export const DeleteTask = async (req, res) => {
    return res.status(200).json({
        message: 'Task Delete',
    })
}