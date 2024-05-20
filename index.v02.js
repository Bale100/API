const express = require('express');
const { ObjectId } = require('mongodb');
//const Course = require('./models/course.model')
const app = express();
app.use(express.json())
const port = "3000"
/* // MongoDB
const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://belalsamir100:xjVr0aXZvLtvDa2v@cluster-db.tcfucet.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-db";
const client = new MongoClient(uri)

const main = async () => {
  await client.connect()
  console.log("Connected");
  const db = client.db('courses')
 const collection = db.collection('animals')
const data = await collection.find().toArray()
console.log("data", data)
}
main(); */
app.listen(port, () => console.log(`listening on port ${port}!`))
