"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const userRouter = (0, express_1.Router)();
//inseting a user
// userRouter.post('/register', userCreate);
//selecting all users
userRouter.get('/users', user_controller_1.getAllUsers);
//selecting a user by id
userRouter.get('/users/:id', user_controller_1.getUserById);
//update a user
userRouter.put('/users/:id', user_controller_1.updateUser);
//deleting a user
userRouter.delete('/users/:id', user_controller_1.deleteUser);
exports.default = userRouter;
