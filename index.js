const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

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
    const itemsDatabase = client.db('itemsDB');
    const itemsCollections = itemsDatabase.collection('items');

    // second database
    const cartDatabase = client.db('cartDB');
    const cartCollections = cartDatabase.collection('perCart');

    app.get('/items', async (request, response) => {
      const cursor = itemsCollections.find();
      const result = await cursor.toArray();
      response.send(result);
    });

    app.get('/items/:name', async (request, response) => {
      const name = request.params.name;
      const query = { brand: name };
      const cursor = itemsCollections.find(query);
      const result = await cursor.toArray();
      response.json(result);
    });

    app.get('/items/id/:id', async (request, response) => {
      const id = request.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await itemsCollections.findOne(query);
      response.send(result);
    });

    app.put('/items/id/:id', async (request, response) => {
      const id = request.params.id;
      const query = { _id: new ObjectId(id) };

      const updateData = {
        $set: {
          name: request.body.name,
        },
      };
      const result = await itemsCollections.updateOne(query, updateData);
      response.send(result);
    });

    app.get('/itemDetails/:id', async (request, response) => {
      const id = request.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await itemsCollections.findOne(query);
      response.send(result);
    });

    app.post('/items', async (request, response) => {
      const newItem = request.body;
      const result = await itemsCollections.insertOne(newItem);
      response.send(result);
    });

    // second data base post method

    app.get('/cart', async (request, response) => {
      const cursor = cartCollections.find();
      const result = await cursor.toArray();
      response.send(result);
    });

    app.post('/cart', async (request, response) => {
      const newCart = request.body;
      const result = await cartCollections.insertOne(newCart);
      response.send(result);
    });

    app.delete('/cart/:id', async (request, response) => {
      const id = request.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await cartCollections.deleteOne(query);
      response.send(result);
    });

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
