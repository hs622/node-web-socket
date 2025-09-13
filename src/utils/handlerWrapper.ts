import { Request, Response } from "express";

// first order fucntion, which takes a handler function as an argument
// and returns a new function that wraps the original handler function
// in a Promise. If the handler function throws an error or returns a
// rejected Promise, the error is caught and passed to the next middleware
// in the Express.js request-response cycle.
const handlerWrapper = (handler: Function) => {
  return (request: Request, response: Response, next: Function) => {
    Promise.resolve(handler(request, response, next)).catch((err) => next(err));
  };
};

export { handlerWrapper };
