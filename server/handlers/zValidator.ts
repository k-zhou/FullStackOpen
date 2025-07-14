// This is a simplified and slimmed-down version of zValidator from @hono/zod-Validator
// https://www.npmjs.com/package/@hono/zod-validator
// written for Express

// This one assumes the target being verified is valid JSON and no other type

const zValidator = (schema, options={}) => async (request, response, next) => {

  // First use express.json() before this. How to add it as part of this function?
  const target = await request.body;
  const result = await schema.safeParseAsync(target);
  if (!result.success) {
     response.json(result);
     response.status(400);
     return;
  }

  // Successful parse, continues with the rest of the request as normal
  next();
}

export { zValidator };