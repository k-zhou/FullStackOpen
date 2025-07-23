
import dotenv from "npm:dotenv";
import mongoose from "npm:mongoose";
import { noteSchema } from "../types/note-schema-mongoose.ts";

dotenv.config({ path: `${process.cwd()}/../../.env`, debug: true });
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

// // Require a password argument from the user.
// if (process.argv.length < 3) {
//   console.log("Error: Password required");
//   process.exit(1);
// }

const database = mongoose;

await database.connect(credentials).then(response => {
  console.log(`Successfully connected to ${dbName}`);
}).catch(error => {
  console.log(error.message);
  process.exit(1);
});
// const Notes = database.model("Note", noteSchema);

// if (process.argv.length == 3) {

//   // If only the password is provided, 
//   // look up all entries in the database

//   console.log("Listing all entries:");
//   Notes.find({}).then(result => {
//     result.forEach(note => {
//       console.log(JSON.stringify(note));
//     })
//     console.log("----- End -----");
//     mongoose.connection.close();
//     process.exit(0);
//   });

// } if (process.argv.length == 5) {

//   // If two more arguments are provided, 
//   // set these as the content of a new note and add it to the database

//   const newNote = new Notes({
//     content:   process.argv[3], 
//     important: Boolean(process.argv[4]),
//   });
//   console.log(`Creating new note: ${newNote}`);
//   newNote.save().then(response => {
//     console.log(`Successfully saved note to database "${dbName}".`);
//     mongoose.connection.close();
//     process.exit(0);
//   });
// } else {
//   console.log("Cannot determine action. Exiting.");
//   process.exit(0);
// }

export { database };