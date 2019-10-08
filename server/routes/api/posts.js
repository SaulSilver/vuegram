const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

router.get('/', (req, res) => {
  const posts = await loadPostsCollection();
  res.send(posts.find({}).toArray());
});

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(
    'localhost:5001',
    { useNewUrlParser: true }
  );
  return client.db('vuegram').collection('posts');
}
module.exports = router;
