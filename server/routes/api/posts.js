const express = require("express");
const mongodb = require("mongodb");
const config = require("../../../config");
const router = express.Router();

// Get all posts
router.get("/", async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

// Add a post
router.post("/", async (req, res) => {
  const posts = await loadPostsCollection();

  await posts.insertOne({
    text: req.body.text,
    createdAt: Date()
  });
  // .then(post => res.send(post["ops"]));

  res.status(201).send("Post Added!");
});

// Delete post by id
router.delete("/:id", async (req, res) => {
  const posts = await loadPostsCollection();

  await posts.deleteOne({ _id: mongodb.ObjectID(req.params.id) });
  res.status(200).send(`Post ${req.params.id} deleted!`);
});

//FUNCTIONS
// Get the posts collection from db
async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(config.MONGODB_URI, {
    useNewUrlParser: true
  });

  return client.db("vue_express_mongo").collection("posts");
}

module.exports = router;
