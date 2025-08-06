
// import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";

import * as notes from "./endpoints/notes.ts";
import * as phonebook from "./endpoints/phonebook.ts";
import { unknownEndpoint } from "./endpoints/unknownEndpoint.ts";

import { dummyValidator } from "./handlers/dummyValidatorMiddleware.ts"

import { errorMiddlesware } from "./handlers/errorMiddleware.ts";

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
app.get("/api/notes", notes.fetchAllNotes);
app.get("/api/notes/:id", dummyValidator, notes.fetchOneNote);
app.post("/api/notes", ...notes.postNewNote);
app.delete("/api/notes/:id", notes.deleteNote);

// Phonebook
app.get("/info", phonebook.infoPage);
app.get("/api/persons", phonebook.fetchAllNumbers);
app.get("/api/persons/:id", phonebook.fetchOneNumber);
app.post("/api/persons", ...phonebook.postNewNumber);
app.put("/api/persons/:id", ...phonebook.updateNumber);
app.delete("/api/persons/:id", phonebook.deleteNumber);

/* Template */ /*
app.get("/", handler);
app.get("/", (req, res) => {
  res.send("template stuff");
});
*/

app.use(unknownEndpoint);
app.use(errorMiddlesware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});