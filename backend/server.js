const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const fileupload = require("express-fileupload");
const morgan = require("morgan");
const connectDb = require("./config/db");
const { errorHandler, notFound } = require("./middlewares/errorHandler");

// routers
const authRouter = require("./routes/authRouters");
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const categoryRouter = require("./routes/categoryRouter");

dotenv.config();

console.log(process.env.MONGO_URI);

connectDb();

const app = express();

// body and cookie parser
app.use(express.json());
app.use(cookieParser());
app.use(fileupload());
app.use(express.static(path.join(__dirname, "public")));

// morgan logger
app.use(morgan("dev"));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/category", categoryRouter);

// errorHandler
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
