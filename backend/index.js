const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
dotenv.config({ path: "backend/config/config.env" });

const authRoute = require("./router/authRouter");
const userRoute = require("./router/userRouter");
const movieRoute = require("./router/movieRouter");
// const listRoute = require("./router/lists");

const DATABASE_URL = process.env.DATABASE;

app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoute);
app.use("/api", userRoute);
app.use("/api", movieRoute);
// app.use("/api", listRoute);

mongoose
  .connect(DATABASE_URL, {
    //   useCreateIndex: true,
    useNewUrlParser: true,
    //   useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.get("/", (req, res) => {
  res.json({
    message: "Hello from netflix server",
  });
});
app.listen("8000", () => {
  console.log(`Server is running at 8000`);
});
