
import mongoose from "npm:mongoose";
import { noteSchema } from "../types/note-schema-mongoose.ts";

// const credentials = process.env.MONGODB;
if (process.argv.length < 3) {
  console.log("Error: Password required");
  process.exit(1);
}
const username = "generic";
const password = process.argv[2];
const databaseName = "noteApp";
const credentials = `mongodb+srv://${username}:${password}@kz-fullstackopen.lhbm437.mongodb.net/${databaseName}?retryWrites=true&w=majority&appName=kz-FullStackOpen`;

const database = mongoose;

database.connect(credentials);
const Notes = database.model("Note", noteSchema);


if (process.argv.length == 3) {

  // If only the password is provided, 
  // look up all entries in the database

  console.log("Listing all entries:");
  Notes.find({}).then(result => {
    result.forEach(note => {
      console.log(note);
    })
    console.log("----- End -----");
    mongoose.connection.close();
    process.exit(0);
  });

} if (process.argv.length == 5) {

  // If two more arguments are provided, 
  // set these as the content of a new note and add it to the database

  const newNote = new Notes({
    content:   process.argv[3], 
    important: Boolean(process.argv[4]),
  });
  console.log(`Creating new note: ${newNote}`);
  newNote.save().then(response => {
    console.log(`Successfully saved note to database "${databaseName}".`);
    mongoose.connection.close();
    process.exit(0);
  });
}

// export { database };