import express from "express";
import { editVideo, upload, deleteVideo } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)/edit", editVideo);
videoRouter.get("/upload", upload);
videoRouter.get("/:id(\\d+)/delete", deleteVideo);

export default videoRouter;