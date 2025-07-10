const dummyValidator = (request, response, next) => {
  console.log(`I'm just a dummy middleware. You're accessing "${request.path}"`);
  next();
};

export { dummyValidator };