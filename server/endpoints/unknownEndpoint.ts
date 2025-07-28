
export const unknownEndpoint = (request, response) => {
  response.status(404).json({"message": `${request.path}: No such page exists.`});
};