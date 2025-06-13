const connectToMongo = require("./db.js");
const express = require("express");
require("dotenv").config();
var cors = require("cors");

connectToMongo();

const app = express();
const port = process.env.PORT || 4000;

// Update CORS to allow only your frontend domain
const allowedOrigins = [
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

// app.use(cors());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/fetchNotes", require("./routes/fetchNotes"));

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
