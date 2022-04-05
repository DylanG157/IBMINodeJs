const APP_ERROR_MESSAGES = {
  CANT_FIND_DS: 'Cannot find datastructure for:',
  CANT_CREATE_CONFIG: 'Cannot service configuration for domain:',
  CANT_GET_SERVICE_OBJ: 'Cannot get service object for domain:',
  CANT_GET_MAPPER_IND: 'Cannot get mapper index for domain:',
  CANT_EXE_MAPPER_FUNC: 'Unable to execute the mapping function',
  CANT_EXE_CLEAN_ARR_FUNC: 'Unable to perform the clean array function',
  CANT_DET_OBJ_MAPPER: 'Unable to determine the object mapper',
  CANT_EXT_QRY_PARAMS: 'Unable to extract query params',
  CANT_EXE_XML2JS: 'Unable to perform xml 2 js conversion',
  CANT_GET_SERVICE_DOMAIN:
    'Unable to switch the service object for the given domain and service:',
  CANT_GET_SERVICE_MAPPER_DOMAIN:
    'Unable to switch the service object domain mapper for the given domain and service:',
  AUTH_FAILED: 'Authentication failed',
};

const SERVICE_CHECKER_MESSAGES = {
  PERFORMING_ANALYSIS_SERVICES: 'Performing analysis on following service(s):',
  PERFORMING_ANALYSIS_FUNC: 'Performing analysis on following function(s):',
  MANDATORY_FIELDS_SUCCESS: 'All the mandatory fields are present on:',
  MANDATORY_FIELDS_ERROR: 'The following mandatory fields are not present on:',
  MAPPER_INDEX_ERROR: 'The mapper index is not valid on:',
  MAPPER_INDEX_SUCCESS: 'Mapper index is valid for:',
  REQUEST_RESPONSE_ERROR: 'The request/response objects are not valid for',
  REQUEST_RESPONSE_SUCCESS: 'The request/response objects are valid for:',
  HAS_REQUEST_NO_REQUEST_OBJ:
    'The Service has a request but no valid request object',
  HAS_RESPONSE_NO_RESPONSE_OBJ:
    'The Service has a response but no valid response object',
  MALFORM_REQUEST:
    'The Service has a request but the request object is not correctly formed',
  MALFORM_RESPONSE:
    'The Service has a response but the response object is not correctly formed',
  NOT_USING_DEFAULT_RESPONSE:
    'The Service is not using the default request object',
  NOT_USING_DEFAULT_REQUEST:
    'The Service is not using the default response object',
  MAPPER_INDEX_ABOVE_RANGE: 'Mapper index is above the required range',
  MAPPER_INDEX_BELOW_RANGE: 'Mapper index is BELOW the required range',
  MAPPER_INDEX_NOT_VALID: 'Mapper index is not a valid number',
  IBM_OBJ_MAPPER: 'IBM Response Object Mappers',
  IBM_OBJ_MAPPER_SUCCESS:
    'The Following IBM Response Object Mapper has passed static tests:',
  IBM_OBJ_MAPPER_ERROR:
    'The Following IBM Response Object Mapper has not passed static tests:s',
  IBM_OBJ_MAPPER_NOT_VALID:
    'IBM Response Object mapper is not returning valid objects',
  CLEAN_ARR_FUNCTION: 'IBM Resonse clean array function',
  CLEAN_ARR_INVALID:
    'The IBM Response Clean Array Function is not working as expected',
  FUNCTION_GENERAL: 'The following function is working as expected:',
  DETERMINE_OBJ_MAPPER: 'Determine Object Mapper',
  DETERMINE_OBJ_MAPPER_ERROR:
    'The Determine Object Mapper is not working as expected:',
};

const VALID_REQUEST = {
  request: [
    { name: 'brandDescription', type: '50A', value: ' ' },
    { name: 'brandCode', type: '12A', value: ' ' },
  ],
};

const VALID_RESPONSE = {
  response: [
    { name: 'brandDescription', type: '50A', value: ' ' },
    { name: 'brandCode', type: '12A', value: ' ' },
  ],
};
const VALID_OBJECT = {
  programName: '',
  programLibl: '',
  programFunction: '',
  hasRequest: true,
  hasResponse: true,
  mapperIndex: 3,
  request: {
    type: 'ds',
    fields: VALID_REQUEST,
  },
  response: {
    type: 'ds',
    fields: VALID_RESPONSE,
  },
};

const VALID_MAPPER_MAX_VALUE = 3;
const VALID_MAPPER_MIN_VALUE = 1;

// eslint-disable-next-line import/prefer-default-export
export {
  APP_ERROR_MESSAGES,
  SERVICE_CHECKER_MESSAGES,
  VALID_REQUEST,
  VALID_RESPONSE,
  VALID_OBJECT,
  VALID_MAPPER_MAX_VALUE,
  VALID_MAPPER_MIN_VALUE,
};
