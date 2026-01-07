const connectToMongo = require("./db.js");
const express = require("express");
require("dotenv").config();
var cors = require("cors");

const app = express();
const port = process.env.PORT || 4000;

// Update CORS to allow only your frontend domain
const allowedOrigins = [
  "https://free-notes.sanchitforyou.co.in",
  "https://free-notes-delta.vercel.app",
  "http://localhost:3000", // for local development
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/fetchNotes", require("./routes/fetchNotes"));

connectToMongo()
  .then(() => {
    app.listen(port, () => {
      console.log("server started");
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
