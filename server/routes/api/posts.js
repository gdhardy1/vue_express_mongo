const express = require('express');
const mongodb = require('mongodb');
const config = require('../../../config');
const router = express.Router();

// Get
router.get('/', async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

// Add
router.post('/', async (req, res) => {
  const posts = await loadPostsCollection();

  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date()
  });

  res.status(201).send('Post Added!');
});

// Delete
router.delete('/:id', async (req, res) => {
  const posts = await loadPostsCollection();

  await posts.deleteOne({ _id: mongodb.ObjectID(req.params.id) });
  res.status(200).send(`Post ${req.params.id} deleted!`);
});

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(config.MONGODB_URI, {
    useNewUrlParser: true
  });

  return client.db('vue_express').collection('posts');
}

module.exports = router;
