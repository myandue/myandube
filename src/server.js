import express from "express";

const app = express();

const PORT = 4000;

const handleHome = (req, res) => {
    return res.send("hi");
}

app.get("/", handleHome);

const handleStart = () => {
    console.log(`We're going to http://localhost:${PORT}`);
}

app.listen(4000, handleStart);