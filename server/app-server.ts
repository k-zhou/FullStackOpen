
// import dotenv from "npm:dotenv";
import express from "npm:express";
import cors from "npm:cors";
import morgan from "npm:morgan";

import * as notesHandler from "./handlers/notes-handler.ts";
import * as phonebookHandler from "./handlers/phonebook-handler.ts";
import { dummyValidator } from "./handlers/dummyValidatorMiddleware.ts"

// dotenv.config(); 
// const test_env = process.env.PORT || 0;
// console.log(`Server ${test_env}, ${process.env.SERVER_PORT || "unavailable server port"}`);
const PORT = process.env.SERVER_PORT || 3001;

const app = express();
const corsOptions = {

};
app.use(cors());

// Sets up Morgan
// Defines a new text token for showing the payload
morgan.token("body", (req, res) => JSON.stringify(req.body));
// app.use(morgan("tiny"));
// The preset "tiny" corresponds to ":method :url :status :res[content-length] - :response-time ms"
app.use(morgan(`:method ":url" [Status :status] [Content-length :res[content-length]] [:response-time ms] Payload :body`));

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
app.post("/api/persons/:id", ...phonebookHandler.updateNumber);
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