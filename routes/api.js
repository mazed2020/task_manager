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
const router = express.Router();

//router user
router.post('/Registration',Registration);
router.post('/login',Login);
router.get('/ProfileDetails',ProfileDetails);
router.post('/ProfileUpdate',ProfileUpdate);
router.post('/EmailVerify',EmailVerify);
router.post('/CodeVerify',CodeVerify);
router.post('/ResetPassword',ResetPassword);


//task router
router.post('/CreateTask',CreateTask);
router.post('/UpdateTaskStatus',UpdateTaskStatus);
router.post('/TaskListByStatus',TaskListByStatus);
router.post('/CountTask',CountTask);
router.post('/DeleteTask',DeleteTask);


export default router;