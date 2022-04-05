import { APP_ERROR_MESSAGES } from '../../constants/application-constants.js';

function assignParamsToRequestObject(requestDS, requestParams) {
  try {
    const keyList = Object.keys(requestParams);
    const finalObject = [];
    requestDS.forEach((requestKey) => {
      keyList.forEach((key) => {
        if (requestKey.dictionaryValue === key) {
          requestKey.value = requestParams[key];
          finalObject.push(requestKey);
        }
      });
    });
    return finalObject;
  } catch (error) {
    throw new Error(APP_ERROR_MESSAGES.CANT_EXT_QRY_PARAMS);
  }
}

export default assignParamsToRequestObject;
