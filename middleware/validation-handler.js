import validator from 'express-validator';

const { validationResult } = validator;

function checkValidation(req) {
  const errors = validationResult(req);
  return errors;
}
function sendError(res, errors) {
  res.status(422).jsonp(errors.array());
}

export { checkValidation, sendError };
