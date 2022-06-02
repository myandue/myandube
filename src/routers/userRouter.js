import express from "express";
import {editUser, profile, deleteUser} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/:id(\\d+)/edit", editUser);
userRouter.get("/:id(\\d+)", profile);
userRouter.get("/:id(\\d+)/delete", deleteUser);

export default userRouter;