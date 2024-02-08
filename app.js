import "express-async-errors"
import express from "express";
import dotenv from "dotenv";
import router from "./src/routers/index.js";  
import errorHandler from "./src/middlewares/errorHandler.js";
import conn from "./db.js";

dotenv.config();

conn();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(express.json({limit: "50mb"}))
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit: 50000}))

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use('/api', router);

// Error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
