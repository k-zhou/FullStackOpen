let numbersRespository = [
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

export { infoPage, fetchAllNumbers };