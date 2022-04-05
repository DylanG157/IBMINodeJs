/**
 * #Add-Route :
 * Change the import to import from your new data structure js file
 * from core -> data-structures
 * EG : from '../data-structures/language-ds.js';;
 */
import {
  returnResponseDataStructure,
  returnRequestDataStructure,
} from '../data-structures/DATASTRUCTUREFILENAME-ds.js';
import assignParamsToRequestObject from '../../utilities/mapping/parameterMapper.js';
import {
  SERVICE_TYPE,
  DEFAULT_PROGRAM_LIBRARY,
} from '../../constants/ibmi-constants.js';
import { APP_ERROR_MESSAGES } from '../../constants/application-constants.js';

/**
 * #Add-Route :
 * Change DOMAINNAME_DOMAIN According to your domain and
 * Do the same for the value it equals too
 * EG : const LANGUAGE_DOMAIN = 'languageDomain';
 */
const DOMAINNAME_DOMAIN = 'domainName + Domain';
/**
 * #Add-Route :
 * Set the program name according to the service program that will be called on the IBMI
 * EG: BCL0061
 */
const PROGRAM_NAME = 'PROGRAMNAMEHERE';
/**
 * #Add-Route :
 * Set PROGRAM_LIBL to the location of the service program on the IBMI service
 * If no value is provided it will revert to UAEPGM
 */
const PROGRAM_LIBL = '';

/**
 * #Add-Route :
 * Create an object to store the configuration in
 * You will name this according to the route you are adding
 * EG: LANGUAGE_SERVICE_CALLS
 */
let ROUTENAMEHERE_SERVICE_CALLS;
function createServiceConfigurations() {
  try {
    /**
     * #Add-Route :
     * Match this name according to the object you create above
     */
    ROUTENAMEHERE_SERVICE_CALLS = {
      /**
       * #Add-Route :
       * Inside this object, you will declare all the various services (APIs) that your route offers
       * So change 'serviceOfferingNameHere, too your service offering
       * EG: getLanguagePreference
       */
      serviceOfferingNameHere: {
        programName: PROGRAM_NAME,
        programLibl:
          PROGRAM_LIBL === '' ? DEFAULT_PROGRAM_LIBRARY : PROGRAM_LIBL,
        /**
         * #Add-Route :
         * change programFunction to procedure you are call in the particular service program we set above
         * EG : GETLANGUAGEPREFERENCE
         */
        programFunction: 'SRVPGMPROCEDURENAMEHERE',
        hasRequest: true,
        hasResponse: true,
        mapperIndex: 3,
        /**
         * #Add-Route :
         * Change both the response and request data structure parameter in the appropriate functions
         * according to the service program PI which is setup in core - data structures
         * EG: fields: returnRequestDataStructure('getLanguageDS'),
         */
        request: {
          type: SERVICE_TYPE,
          fields: returnRequestDataStructure('getLanguageDS'),
        },
        response: {
          type: SERVICE_TYPE,
          fields: returnResponseDataStructure('getLanguageDS'),
        },
      },
    };
  } catch (error) {
    /**
     * #Add-Route :
     * in the error message that is being thrown change DOMAINNAME_DOMAIN to the
     * domain we declared as the first const
     * EG: APP_ERROR_MESSAGES.CANT_CREATE_CONFIG + LANGUAGE_DOMAIN
     */
    throw new Error(APP_ERROR_MESSAGES.CANT_CREATE_CONFIG + DOMAINNAME_DOMAIN);
  }
}

/**
 * #Add-Route :
 * Create the method for getting the service objects for your domain : copy /paste and change name to include domain
 * So change serviceOfferedServiceObject to match the domain
 * EG: getlanguageServiceObject
 */
function serviceOfferedServiceObject(req, value) {
  try {
    /**
     * #Add-Route :
     * Change ROUTENAMEHERE_SERVICE_CALLS[value] to the object created before
     * the createServiceConfigurations() function
     * EG: LANGUAGE_SERVICE_CALLS[value]
     */
    const returnValue = ROUTENAMEHERE_SERVICE_CALLS[value];
    if (returnValue.hasRequest) {
      returnValue.request.fields = assignParamsToRequestObject(
        returnValue.request.fields,
        req.query
      );
    }

    return returnValue;
  } catch (error) {
    throw new Error(
      /**
       * #Add-Route :
       * in the error message that is being thrown change DOMAINNAME_DOMAIN to the
       * domain we declared as the first const
       * EG: APP_ERROR_MESSAGES.CANT_GET_SERVICE_OBJ + LANGUAGE_DOMAIN
       */
      APP_ERROR_MESSAGES.CANT_GET_SERVICE_OBJ + DOMAINNAME_DOMAIN
    );
  }
}

createServiceConfigurations();
/**
 * #Add-Route :
 * Change : DOMAINNAME_SERVICES according to the domain you adding
 * Change : ROUTENAMEHERE_SERVICE_CALLS to the object created before
 *          the createServiceConfigurations() function
 * EG: const LANGUAGE_SERVICES = LANGUAGE_SERVICE_CALLS;
 */
const DOMAINNAME_SERVICES = ROUTENAMEHERE_SERVICE_CALLS;
/**
 * #Add-Route :
 * Change the second export value to match the one above
 * EG: export { getlanguageServiceObject, LANGUAGE_SERVICES, LANGUAGE_DOMAIN };
 */
export { serviceOfferedServiceObject, DOMAINNAME_SERVICES, DOMAINNAME_DOMAIN };
