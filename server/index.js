const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const posts = require('./routes/api/posts');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server is running on port', port));

app.use('/api/posts', posts);
