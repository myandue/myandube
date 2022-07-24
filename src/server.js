//express 및 설정 파일

import express from "express";
import morgan from "morgan"
import session from "express-session";
import MongoStore from "connect-mongo";

import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";

const app = express();
const logger = morgan("dev");

//setting
app.set("view engine", "pug");
app.set("views", `${process.cwd()}/src/views`);

//middleware
app.use(logger);
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized:false,
    store:MongoStore.create({mongoUrl:process.env.DB_URL})
}))
app.use(localsMiddleware);

//router
app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/video", videoRouter);

export default app;