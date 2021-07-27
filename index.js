const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const categoryRouter = require("./routers/categoryRoutes")

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
  //res.send("Server is up and running on port %s", PORT);
});

app.use("/api", categoryRouter)

app.listen(PORT);
