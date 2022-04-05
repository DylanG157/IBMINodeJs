import { APP_ERROR_MESSAGES } from '../../constants/application-constants.js';
import { DEFAULT_DATASTRUCTURE } from '../../constants/ibmi-constants.js';

const staticObjects = {
  /**
   * #Add-Route :
   * Step One: Change serviceOffered to the service name that you are offering in your route eg: getLanguageDS
   * Step Two: Change the request object to match that of the service program
   * Step three: Change the response object to match that of the service program
   */
  serviceOfferedDS: {
    request: [
      { name: 'flag', type: '1A', value: ' ', dictionaryValue: 'flag' },
      {
        name: 'referenceNumber',
        type: '9A',
        value: ' ',
        dictionaryValue: 'referenceNumber',
      },
    ],
    response: [
      { name: 'referenceNumber', type: '9A', value: ' ' },
      { name: 'languageID', type: '2A', value: ' ' },
    ],
  },
};

function returnResponseDataStructure(serviceName) {
  try {
    const returnValue = staticObjects[serviceName].response;
    if (returnValue) {
      return returnValue;
    }
  } catch (error) {
    throw new Error(APP_ERROR_MESSAGES.CANT_FIND_DS + serviceName);
  }

  return DEFAULT_DATASTRUCTURE;
}

function returnRequestDataStructure(serviceName) {
  try {
    const returnValue = staticObjects[serviceName].request;
    if (returnValue) {
      return returnValue;
    }
  } catch (error) {
    throw new Error(APP_ERROR_MESSAGES.CANT_FIND_DS + serviceName);
  }

  return DEFAULT_DATASTRUCTURE;
}
export { returnRequestDataStructure, returnResponseDataStructure };
