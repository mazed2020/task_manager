import express from 'express';
import {
    CodeVerify,
    EmailVerify,
    Login,
    ProfileDetails,
    ProfileUpdate,
    Registration, ResetPassword
} from "../app/controllers/users.controller.js";
import {CreateTask, DeleteTask,TaskListByStatus,UpdateTaskStatus,CountTask} from "../app/controllers/task.controller.js";
import AuthMiddlewares from "../app/middlewares/auth.middlewares.js";
const router = express.Router();

//router user
router.post('/Registration',Registration);
router.post('/login',Login);
router.get('/ProfileDetails',AuthMiddlewares,ProfileDetails);
router.post('/ProfileUpdate',AuthMiddlewares,ProfileUpdate);
router.post('/EmailVerify/:email',EmailVerify);
router.post('/CodeVerify', CodeVerify);
router.post('/ResetPassword',ResetPassword);


//task router
router.post('/CreateTask',AuthMiddlewares,CreateTask);
router.post('/UpdateTaskStatus/:id',AuthMiddlewares,UpdateTaskStatus);
router.post('/TaskListByStatus',AuthMiddlewares,TaskListByStatus);
router.post('/CountTask',AuthMiddlewares,CountTask);
router.post('/DeleteTask/:id',AuthMiddlewares,DeleteTask);


export default router;