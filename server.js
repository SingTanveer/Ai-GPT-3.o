const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

//routes path
const router = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorMiddleware");

//dotenv config
dotenv.config();

//connect to database
connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());

//middleware

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

//API routes

app.use("/api/auth", router);
app.use("/api/claudeai", require("./routes/claudeaiRoutes"));

app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.DEV_MODE} mode on port no ${PORT}`
      .bgGreen.white
  );
});
