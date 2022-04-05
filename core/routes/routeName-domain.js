import express from 'express';
import makeCallToIbm from '../../data-access-layer/ibm-access.js';
// #Add-Route : add your new domain name in the domain-registration file
//              more instructions in that particular JS
import { DOMAIN_NAMES } from '../domain-registration.js';
// #Add-Route : Change to your new service model which you will create in core -> models
//              EG: import { validationModel } from '../models/language-models.js';
import { validationModel } from '../models/newService-models.js';
import {
  checkValidation,
  sendError,
} from '../../middleware/validation-handler.js';
import { authenticateToken } from '../../middleware/jwt-authenticate.js';

// #Add-Route : Change to name of new route EG: const languageRouter = express.Router();
const nameOfRouter = express.Router();

// #Add-Route : Change function name to name of service offered in the new route
// EG: async function getLanguagePreference(req, res, next) {
async function newServiceName(req, res, next) {
  const errors = checkValidation(req);
  if (!errors.isEmpty()) {
    sendError(res, errors);
  } else {
    try {
      const result = await makeCallToIbm(
        // #Add-Route : Change to your new domain name after DOMAIN_NAMES.
        // EG: DOMAIN_NAMES.LANGUAGE_DOMAIN
        DOMAIN_NAMES.CHANGETOYOURNEWROUTEDOMAIN,
        // #Add-Route : Change to your new service name eg getLanguagePreference
        // EG : 'getLanguagePreference'
        'newServiceName',
        req
      );
      res.send(result);
      next();
    } catch (error) {
      next(error);
    }
  }
}
// #Add-Route : Change to name of new route
// EG: languageRouter
nameOfRouter.get(
  // #Add-Route : Change to your new service name eg getLanguagePreference
  // EG : '/getLanguagePreference'
  '/newServiceName',
  // #Add-Route : Change to your new service name eg getLanguagePreference
  // EG : validationModel('getLanguagePreference'),
  validationModel('newServiceName'),
  authenticateToken,
  // #Add-Route : Change to your new service name eg getLanguagePreference
  // EG : getLanguagePreference
  newServiceName
);

// eslint-disable-next-line import/prefer-default-export
// #Add-Route : Change to your new DOMAIN name eg languageRouter
// EG : languageRouter
export default nameOfRouter;
