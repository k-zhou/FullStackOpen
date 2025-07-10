import express from "npm:express";

let notes:Array<object> = [
  {
    id: "1",
    content: "text",
    important: true,
  },
  {
    id: "2",
    content: "hext",
    important: false,
  },
  {
    id: "3",
    content: "blext",
    important: true,
  },
];

const fetchAllNotes = async (request, response) => {
  response.json(notes);
};

const fetchOneNote = async (request, response) => {
  const foundNote = notes.find(n => n.id === request.params.id);
  if (!foundNote) {
    // response.statusMessage = "No such note has been found."; // Doesn't work?
    // response.status(404).end();
    // response.json({ Message: "Unauthorized"}); // Bamboozled
    response.status(403).end();
    return;
  }
  response.json(foundNote);
};

const postNewNote = [ 
  express.json(), 
  async (request, response) => {
    const newNote:object = request.body;
    // console.log(typeof(newNote), " - newNote", newNote);
    notes.push(newNote); // returns new length
    response.json(newNote);
}];

const deleteNote = async (request, response) => {
  process.stdout.write(`Deleting note ${request.params.id} \n`); // corresponds to console.log, belongs to Node.js
  // notes = notes.filter(n => n.id !== request.params.id); // returns a shallow copy
  const i = notes.findIndex(n => n.id === request.params.id);
  let deletedNote:object = {};
  if (i !== -1) {
    deletedNote = notes.splice(i, 1);
    console.log(" - Success", deletedNote);
  } else {
    console.log(" - None found"); 
  }
  response.json(deletedNote);
  response.status(204);
  
};

/* Template */ /*
const newFun = async (request, response) => {
  response.send("template stuff");
};
*/

export { fetchAllNotes, fetchOneNote, postNewNote, deleteNote };