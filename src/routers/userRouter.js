import express from "express";
import {startGithub, finishGithub, profile, deleteUser, getEditUser, postEditUser, getChangePassword, postChangePassword} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/github/start",startGithub);
userRouter.get("/github/finish",finishGithub);
userRouter.get("/:id([a-f0-9]{24})", profile);
userRouter.route("/:id([a-f0-9]{24})/edit").get(getEditUser).post(postEditUser);
userRouter.route("/:id([a-f0-9]{24})/edit/password").get(getChangePassword).post(postChangePassword);
userRouter.get("/:id([a-f0-9]{24})/delete", deleteUser);

export default userRouter;