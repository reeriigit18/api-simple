import { Router,Request,Response } from "express";
import prisma from "../prisma/prisma";
import { userCreate,getUserById,getAllUsers ,updateUser,deleteUser} from "../controller/user.Controller";
const userRouter = Router();



//inseting a user
userRouter.post('/register', userCreate);
//selecting all users
userRouter.get('/users', getAllUsers);
//selecting a user by id
userRouter.get('/users/:id', getUserById);


//update a user
userRouter.put('/users/:id',updateUser);


//deleting a user
userRouter.delete('/users/:id',deleteUser);


export default userRouter;


