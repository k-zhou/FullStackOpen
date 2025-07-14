
import express from "npm:express";
import morgan from "npm:morgan";

import * as notesHandler from "./handlers/notes-handler.ts";
import * as phonebookHandler from "./handlers/phonebook-handler.ts";
import { dummyValidator } from "./handlers/dummyValidatorMiddleware.ts"

const PORT = 3001;

const app = express();

app.use(morgan("tiny"));

app.get("/", (request, response) => {
  response.send("<h1>Hello World!<h1/>");
});

// Notes
app.get("/api/notes", notesHandler.fetchAllNotes);
app.get("/api/notes/:id", dummyValidator, notesHandler.fetchOneNote);
app.post("/api/notes", ...notesHandler.postNewNote);
app.delete("/api/notes/:id", notesHandler.deleteNote);

// Phonebook
app.get("/info", phonebookHandler.infoPage);
app.get("/api/persons", phonebookHandler.fetchAllNumbers);
app.get("/api/persons/:id", phonebookHandler.fetchOneNumber);
app.post("/api/persons", ...phonebookHandler.postNewNumber);
app.delete("/api/persons/:id", phonebookHandler.deleteNumber);

/* Template */ /*
app.get("/", handler);
app.get("/", (req, res) => {
  res.send("template stuff");
});
*/

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});