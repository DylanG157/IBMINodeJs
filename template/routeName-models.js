import { createDefault } from './common.js';

// #Add-Route : Change to your new API service name
// EG: validateGetLanguagePreference
const validateNewServiceNameHere = [
  // #Add-Route :  Change to your new API service name
  // EG : createDefault('referenceNumber', 9, 9),
  //      createDefault('flag', 1, 2),
  // createDefault('parameterName', MinLength, MaxLength)
  createDefault('parameterName', 9, 9),
  createDefault('parameterName', 1, 2),
];

function validationModel(key) {
  switch (key) {
    // #Add-Route : Change to your new API service name
    // EG: getLanguagePreference
    case 'newServiceNameHere':
      // #Add-Route : Change to your new API service name
      // EG: validateGetLanguagePreference
      // NB: Must match to name given on line 5
      return validateNewServiceNameHere;
    default:
      return true;
  }
}

// eslint-disable-next-line import/prefer-default-export
export { validationModel };
