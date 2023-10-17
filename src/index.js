const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/product");
const cors = require('cors');

require("dotenv").config();

const app = express();

app.use(cors()); // This will enable CORS for all routes

const hostname = "127.0.0.1";
const port = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use('/api', productRoutes);

//routes
app.get("/", (req, res) => {
  res.send("Welcome to my API");
});


//mongodb connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to Mongodb Atlas."))
  .catch((error) => console.error(error));

app.listen(port, () => console.log("server listening on port", port));

