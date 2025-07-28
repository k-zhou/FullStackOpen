
export const errorMiddlesware = (error, request, response, next) => { 

  switch(error.name){
    case "CastError":
      return response.status(400).send({ error: "Malformed id" });
    
    default:
      return response.json({ error: "Unknown error" });
  };

  next();
};