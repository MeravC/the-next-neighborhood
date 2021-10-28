const {MongoClient} = require('mongodb');

const uri = "mongodb+srv://Merav:dbPass@cluster0.01myv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri);
const myNeighborhoods = [{'neighborhood':'Shawnee','disFromCenter':'10','age':'30','income':'2000','availabilityOfPublicTrans':'5','populationDensity':'9'},{'neighborhood':'Pawtuckett','disFromCenter':'8','age':'25','income':'25000','availabilityOfPublicTrans':'10','populationDensity':'29'},{'neighborhood':'Jordan','disFromCenter':'20','age':'50','income':'6000','availabilityOfPublicTrans':'0','populationDensity':'50',},{'neighborhood':'Dorchester','disFromCenter':'180','age':'60','income':'50000','availabilityOfPublicTrans':'10','populationDensity':'23',},{'neighborhood':'Avondale','disFromCenter':'100','age':'80','income':'10123','availabilityOfPublicTrans':'5','populationDensity':'4010'},{'neighborhood':'Deanwood','disFromCenter':'810','age':'40','income':'13000','availabilityOfPublicTrans':'0','populationDensity':'120'},{'neighborhood':'Washington Park','disFromCenter':'88','age':'32','income':'2030','availabilityOfPublicTrans':'5','populationDensity':'9'}];
const database = client.db("Neighborhood");
const collection = database.collection("neighborhood");

async function uploadToMongo() {
    try {
      await client.connect();
      const result = await collection.insertMany(myNeighborhoods);
      console.log(`${result.insertedCount} documents were inserted`);
    } catch (err){
        console.log(`[uploadToMongo] Failed: ${err.message}`);
    }
}

//   uploadToMongo().catch(console.error);


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


  