const { MongoClient } = require("mongodb");

// Connection URI
const uri = "mongodb://localhost:27017";

async function updateOneInCollection(collection, id, update, options) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const result = await client.db("guilds").collection(collection).updateOne({ _id: id }, update, options);
    return result;
  } finally {
    await client.close();
  }
}

module.exports = {
  updateOneInCollection,
}