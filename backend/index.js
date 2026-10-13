require("dotenv").config();
const express = require("express");
const urlRoute = require('./routes/url')
const URL = require("./models/url");
const { connectDB } = require("./connection")
const app = express();
const PORT = 8001;
const userRoute = require("./routes/user");
const reqResLogger = require("./middlewares/reqResLogger");
const cookieParser = require("cookie-parser");
const cors = require("cors");


//connect to database
connectDB("mongodb://127.0.0.1:27017/urlShortner").then(() => {
    console.log("MongoDB connected successfully");
})
    ;

//middlewares
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
}));
app.use(reqResLogger);
app.use(cookieParser());

//routes
app.use("/user", userRoute);
app.use("/url", urlRoute);

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);

})