import "express-async-errors";
import express from "express";
import dotenv from "dotenv";
import router from "./src/routers/index.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import conn from "./db.js";
import cors from "cors";
import corsOption from "./src/helpers/corsOptions.js";
import mongoSanitize from "express-mongo-sanitize";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import apiLimiter from "./src/middlewares/rateLimit.js";
import moment from "moment-timezone"
moment.tz.setDefault("Europe/Istanbul")

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

// Connect to database
conn();

// Create express app
const app = express();

const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
// ...

// Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);

// Serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(__dirname));

// Cors
app.use(cors(corsOption));

app.use("/api", apiLimiter)

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", router);

// Error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
