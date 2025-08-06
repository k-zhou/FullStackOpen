
export const errorMiddlesware = (error, request, response, next) => { 

  switch(error.name){
    case "CastError":
      return response.status(400).send({ error: `Malformed id, ${error.message}` });
    case "ValidationError":
      return response.status(400).send({ error: error.message });
    default:
      return response.status(400).json({ error: error });
  };

  next();
};