const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

router.get('/', async (req, res) => {
  const postsDb = await loadPostsCollection();
  const posts = await postsDb.find().toArray();
  res.send(posts);
});

router.post('/', async (req, res) => {
  const postsDb = await loadPostsCollection();
  await postsDb.insertOne({ text: req.body.text, created_at: new Date() });
  res.status(201).send();
});

router.delete('/:id', async (req, res) => {
  const postsDb = await loadPostsCollection();
  await postsDb.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send();
});

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(
    'mongodb://localhost:5001/vuegram',
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  return client.db('vuegram').collection('posts');
}

module.exports = router;
