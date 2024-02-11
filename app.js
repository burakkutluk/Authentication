import "express-async-errors"
import express from "express";
import dotenv from "dotenv";
import router from "./src/routers/index.js";  
import errorHandler from "./src/middlewares/errorHandler.js";
import conn from "./db.js";
import cors from "cors";
import corsOption from "./src/helpers/corsOptions.js";

// Load environment variables
dotenv.config();

// Connect to database
conn();

// Create express app
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json())
app.use(express.json({limit: "50mb"}))
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit: 50000}))

// Cors
app.use(cors(corsOption));

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use('/api', router);

// Error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
