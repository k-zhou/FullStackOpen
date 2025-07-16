
import express from "npm:express";
// import * as uuid from "npm:uuid";
import { nanoid } from "npm:nanoid";
import { zValidator } from "./zValidator.ts";
import { personSchema } from "./validatorSchema.ts";
import type { Person } from "../types/person.ts";

let numbersRespository:Array<Person> = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

/* Template */ /*
const newFun = async (request, response) => {
  response.send("template stuff");
};
*/

const infoPage = async (request, response) => {
  const peopleStr = numbersRespository.length === 1 ? "1 person" : `${numbersRespository.length} people`;
  const nowMs  = Date.now();
  const nowStr = (new Date(nowMs)).toUTCString();
  response.send(`
    <p>The Phonebook has info for ${peopleStr}.</p>
    <p>${nowStr}</p>
    `);
};

const fetchAllNumbers = async (request, response) => {
  response.json(numbersRespository);
};

const fetchOneNumber = async (request, response) => {
  const foundNumber = numbersRespository.find(n => n.id === request.params.id);
  if (!foundNumber) {
    response.status(403).end();
    return;
  }
  response.json(foundNumber);
};

const postNewNumber = [ 
  express.json(), 
  zValidator(personSchema),
  async (request, response) => {
    const newNumber:Person = request.body;
    // Checks for duplicates
    if (numbersRespository.find(p => p.name === newNumber.name)) {
      response.json({ error: `${newNumber.name} already exists in the phonebook.` });
      response.status(403);
      return;
    }
    // Finds a new unused id randomly
    let newId = nanoid();// uuid.v4(); // while (numbersRespository.find(n => n.id === newId)) newId = String(Math.floor(Math.random() * 10000000));
    newNumber.id = newId;
    // console.log(typeof(newNumber), " - newNumber", newNumber);
    numbersRespository.push(newNumber); // returns new length
    response.json(newNumber);
}];

const updateNumber = [ 
  express.json(), 
  zValidator(personSchema),
  async (request, response) => {
    const updatePerson:Person = request.body;
    // Checks for existing entry and updates it
    const foundPerson = numbersRespository.find(p => p.name === updatePerson.name);
    if (foundPerson) {
      // updates number
      numbersRespository.forEach(p => p.name === foundPerson.name ? p.number = updatePerson.number : undefined );
      response.json({ "message": `${foundPerson.name}'s number has been updated.` });
    } else {
      response.status(404).end();
    }
}];

const deleteNumber = async (request, response) => {
  process.stdout.write(`Deleting number ${request.params.id} \n`);
  const i = numbersRespository.findIndex(n => n.id === request.params.id);
  let deletedNumber:object = {};
  if (i !== -1) {
    deletedNumber = numbersRespository.splice(i, 1);
    console.log(" - Success", deletedNumber);
  } else {
    console.log(" - None found"); 
  }
  response.json(deletedNumber);
  response.status(204);
};

export { infoPage, fetchAllNumbers, fetchOneNumber, postNewNumber, updateNumber, deleteNumber };