require("dotenv").config();
import { MongoClient, MongoClientOptions } from "mongodb";

export default async function connectToDataBase() {
  const uri = process.env.MONGODB_URL ?? "";
  const options: MongoClientOptions = {};

  const client = new MongoClient(uri, options);
  await client.connect();
  console.log("COnexao ao banco de dados estabelecida");
  return client;
}
