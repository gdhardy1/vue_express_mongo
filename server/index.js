const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("../config");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Get posts routes
const posts = require("./routes/api/posts");
// Route path to to posts
app.use("/api/posts", posts);

// Handle production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(__dirname + "/public/"));

  // Handle SPA
  app.get(/.*/, (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });
}

const port = config.PORT;

app.listen(port, () => console.log(`Server started on port ${port}`));
