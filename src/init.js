//import 용, 서버 초기화 용 파일

import "./db";
import "./models/Video";

import app from "./server";

const PORT = 4000;

const handleStart = () => {
    console.log(`We're going to http://localhost:${PORT}`);
}

app.listen(4000, handleStart);