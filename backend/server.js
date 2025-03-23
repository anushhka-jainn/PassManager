const express = require('express')
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser')
const cors = require('cors');
dotenv.config()

// Connection URL
const url = process.env.MANGO_URI;
const client = new MongoClient(url);

// Database Name
const dbName = 'passop';
const app = express()
const port = 3000
app.use(bodyparser.json())
app.use(cors())

client.connect();

// Get All The Passwords
app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});

// Save a password
app.post('/', async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.insertOne(password);
  res.send({ success: true, result: findResult });
});

// Delete a password by ID
app.delete('/', async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.deleteOne({ id: password.id });
  res.send({ success: true, result: findResult });
});

// Update a password by ID
app.put('/', async (req, res) => {
  const { id, site, username, password } = req.body;
  const db = client.db(dbName);
  const collection = db.collection('passwords');

  // Update the document where the ID matches
  const findResult = await collection.updateOne(
    { id: id },  // Match the document by ID
    { $set: { site: site, username: username, password: password } } // Update these fields
  );

  if (findResult.modifiedCount === 0) {
    res.status(404).send({ success: false, message: 'Password not found or no changes made' });
  } else {
    res.send({ success: true, result: findResult });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
