import express from "express";
import morgan from "morgan"
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();
const logger = morgan("dev");

const PORT = 4000;

app.set("view engine", "pug");
app.set("views", `${process.cwd()}/src/views`);

app.use(logger);

app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/video", videoRouter);

const handleStart = () => {
    console.log(`We're going to http://localhost:${PORT}`);
}

app.listen(4000, handleStart);