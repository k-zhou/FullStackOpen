
import express from "npm:express";
import { personSchema } from "../types/person-schema-mongoose.ts";
import type { Person } from "../types/person.ts";
import { database } from "../handlers/mongo.ts";

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

const fetchAllNumbers = async (request, response, next) => {
  numberRepository
    .find({})
    .then(result => {
      response.json(result);
    })
    .catch(error => {
      console.log("[!] fetchAllNumbers error");
      next(error);
    });
};

const fetchOneNumber = async (request, response, next) => { 
  numberRepository
    .findById(request.params.id)
    .then(result => {
      response.json(result);
    })
    .catch(error => {
      console.log("[!] fetchOneNumber error");
      next(error);
    });
};

const postNewNumber = [ 
  express.json(), 
  async (request, response, next) => {
    const receivedNumber:Person = request.body;
    // Checks for duplicates
    numberRepository
      .find({ name: receivedNumber.name})
      .then(result => {
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
            .catch(error => {
              console.log("[!] postNewNumber error - saving");
              next(error);
            });
        }
        
      })
      .catch(error => {
        console.log("[!] postNewNumber error - finding");
        next(error);
      });
}];

const updateNumber = [ 
  express.json(), 
  async (request, response, next) => {
    const receivedNumber:Person = request.body;
    // Checks for existing entry and updates it
    numberRepository
      .findByIdAndUpdate(receivedNumber.id, receivedNumber, { runValidators: true })
      .then(result => {
        response.json({ "message": `${receivedNumber.name}'s number has been updated.` });
      })
      .catch(error => {
        console.log("[!] updateNumber error");
        next(error);
      });
}];

const deleteNumber = async (request, response, next) => { 
  process.stdout.write(`Deleting number ${request.params.id} \n`);
  numberRepository
    .findByIdAndDelete(request.params.id)
    .then(result => {
        response.status(204);
        response.json(result);
    })
    .catch(error => {
      response.status(500).end();
      console.log("[!] deleteNumber error");
      next(error);
    });
};

export { infoPage, fetchAllNumbers, fetchOneNumber, postNewNumber, updateNumber, deleteNumber };