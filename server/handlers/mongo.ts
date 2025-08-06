
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: `${process.cwd()}/../.env`, debug: true });
console.log("Loading monolith database URI...");
let credentials  = process.env.MONGODB;
const dbProtocol = "mongodb+srv";
const dbUsername = process.env.MONGOUSER     || "generic";
const dbPassword = process.env.MONGOPASSWORD;
const dbHost     = process.env.MONGOHOST     || "kz-fullstackopen.lhbm437.mongodb.net";
const dbName     = process.env.MONGODATABASE || "noteApp";
const dbOptions  = process.env.MONGOOPTIONS  || "retryWrites=true&w=majority&appName=kz-FullStackOpen";
if (!credentials) {
  console.log("Cannot load monolith URI. Loading piecewise URI.");
  credentials = `${dbProtocol}://${dbUsername}:${dbPassword}@${dbHost}/${dbName}?${dbOptions}`;
} 

const database = mongoose;

await database.connect(credentials).then(response => {
  console.log(`Successfully connected to ${dbName}`);
}).catch(error => {
  console.log("[!] Cannot connect to Mongo:", error.message);
  // process.exit(1);
});

export { database };