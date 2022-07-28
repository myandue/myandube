import express from "express";
import {startGithub, finishGithub, profile, deleteUser, getEditUser, postEditUser} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/github/start",startGithub);
userRouter.get("/github/finish",finishGithub);
userRouter.route("/:id([a-f0-9]{24})/edit").get(getEditUser).post(postEditUser);
userRouter.get("/:id([a-f0-9]{24})", profile);
userRouter.get("/:id([a-f0-9]{24})/delete", deleteUser);

export default userRouter;