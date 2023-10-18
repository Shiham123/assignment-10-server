const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();

// techclusterproject
// pFLfDoPkJEwedqYp

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

const uri =
  'mongodb+srv://techclusterproject:pFLfDoPkJEwedqYp@tech-cluster.dhl3t0m.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.get('/', async (request, response) => {
  response.send('app is running');
});

const run = async () => {
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log('You successfully connected to MongoDB!');
  } catch (error) {
    console.dir(error);
  }
};
run();

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
