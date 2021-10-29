const {MongoClient} = require('mongodb');
const config = require('./config.json');//credentials

const uri = `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_CLUSTER_NAME}.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri);
const database = client.db("Neighborhood");
const collection = database.collection("neighborhood");

module.exports = {
    getAll,
}

async function getAll(){
    try{ 
        await client.connect();
        const result = await collection.find({});
        return result.toArray();
    } catch (err){
        console.log(`[getAll] Failed: ${err.message}`);
        return [];
    }
}


  