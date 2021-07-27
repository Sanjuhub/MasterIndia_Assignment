const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const categoryRouter = require("./routers/categoryRoutes");
const subcategoryRouter = require("./routers/subcategoryRoutes");
const productRouter = require("./routers/productRoutes");

const PORT = 5000;

const app = express();

//MongoDb connection
mongoose.connect(process.env.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.connection
  .once("open", function () {
    console.log("Database connected Successfully");
  })
  .on("error", function (err) {
    console.log("Error", err);
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is up and running on " + PORT);
});

app.use("/api", categoryRouter);
app.use("/api", subcategoryRouter);
app.use("/api", productRouter);

app.listen(PORT);
