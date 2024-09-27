const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3000;

const url = process.env.MONGO_URL || 'mongodb://localhost:27017';
const dbName = process.env.MONGO_DATABSE || 'app';

console.log("Connecting to Mongo using url", url);

const mongo = new MongoClient(url);

mongo.connect(url).then((client) => {
  console.log('Connected to MongoDB');

  const db = client.db(dbName);
  const messagesCollection = db.collection("messages");

  app.get('/api/message', async (req, res) => {

    // Get a random message from the database
    const result = await messagesCollection
        .aggregate([{ $sample: { size: 1 } }])
        .toArray();

    const message = (result.length === 0) ? 
      'Hello world' : result[0].message;

    res.send({ message });
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(e => console.error(e));

// Handle signals gracefully
["SIGINT", "SIGTERM", "SIGUSR2"].forEach(signal => {
  process.on(signal, () => {
    mongo.close().then(() => process.exit());
  })
});
