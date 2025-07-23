
import express from "npm:express";
// import * as uuid from "npm:uuid";
import { nanoid } from "npm:nanoid";
import { zValidator } from "./zValidator.ts";
import { personSchema } from "../types/person-schema-mongoose.ts";
import type { Person } from "../types/person.ts";
import { database } from "./mongo.ts";

// let numberRepository:Array<Person> = [
//     { 
//       "id": "1",
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": "2",
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": "3",
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": "4",
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ];

const numberRepository = database.model("persons", personSchema);

const infoPage = async (request, response) => {
  const count = await numberRepository.collection.countDocuments();
  const peopleStr = count === 1 ? "1 person" : `${count} people`;
  const nowMs  = Date.now();
  const nowStr = (new Date(nowMs)).toUTCString();
  response.send(`
    <p>The Phonebook has info for ${peopleStr}.</p>
    <p>${nowStr}</p>
    `);
};

const fetchAllNumbers = async (request, response) => {
  numberRepository
    .find({})
    .then(result => {
      response.json(result);
    })
    .catch(error => {
      response.statusMessage = "Error with fetching all numbers.";
      response.status(404).end();
      console.log("[!] fetchAllNumbers error");
      console.log(JSON.stringify(error));
    });
};

const fetchOneNumber = async (request, response) => {
  numberRepository
    .findById(request.params.id)
    .then(result => {
      response.json(result);
    })
    .catch(error => {
      response.statusMessage = "No such person has been found.";
      response.status(404).end();
      console.log("[!] fetchOneNumber error");
      console.log(error);
    });
};

const postNewNumber = [ 
  express.json(), 
  // zValidator(personSchema),
  async (request, response) => {
    const receivedNumber:Person = request.body;
    // Checks for duplicates
    numberRepository
      .find({ name: receivedNumber.name})
      .then(result => {
        // console.log(result); // GDPR
        if (result.length) {
          response.status(403);
          response.json({ error: `${receivedNumber.name} already exists in the phonebook.` });
        } 
        else {
          const newNumber = new numberRepository(receivedNumber);
          newNumber
            .save()
            .then(result => {
              response.json({ message: `${receivedNumber.name} added to the phonebook.`});
            })
            .catch(err => {
              console.log("[!] postNewNumber error - saving");
              console.log(err);
            });
        }
        
      })
      .catch(err => {
        console.log("[!] postNewNumber error - finding");
        console.log(err);
      });
}];

const updateNumber = [ 
  express.json(), 
  // zValidator(personSchema),
  async (request, response) => {
    const receivedNumber:Person = request.body;
    // Checks for existing entry and updates it
    numberRepository
      .findByIdAndUpdate(request.params.id)
      .then(result => {
        // console.log(result); // GDPR
        response.json({ "message": `${receivedNumber.name}'s number has been updated.` });
      })
      .catch(err => {
        console.log("[!] updateNumber error");
        console.log(err);
      });
}];

const deleteNumber = async (request, response) => {
  process.stdout.write(`Deleting number ${request.params.id} \n`);
  numberRepository
    .findByIdAndDelete(request.params.id)
    .then(result => {
        response.status(204);
        response.json(result);
        // console.log(result); // GDPR
    })
    .catch(err => {
      response.status(500).end();
      console.log("[!] deleteNumber error");
      console.log(err);
    });
};

export { infoPage, fetchAllNumbers, fetchOneNumber, postNewNumber, updateNumber, deleteNumber };