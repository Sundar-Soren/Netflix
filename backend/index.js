const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
dotenv.config({ path: "backend/config/config.env" });
const path = require("path");

const authRoute = require("./router/authRouter");
const userRoute = require("./router/userRouter");
const movieRoute = require("./router/movieRouter");

const DATABASE_URL = process.env.DATABASE;

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoute);
app.use("/api", userRoute);
app.use("/api", movieRoute);

mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
