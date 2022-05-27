import express from "express";

const app = express();

const PORT = 4000;

const handleHome = (req, res) => {
    return res.send("Welcome");
}

const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
}

app.use(logger);
app.get("/", handleHome);

const handleStart = () => {
    console.log(`We're going to http://localhost:${PORT}`);
}

app.listen(4000, handleStart);