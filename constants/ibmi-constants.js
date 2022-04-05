const CONNECTION_DETAILS = 'Driver=IBM i Access ODBC Driver;System=';
const TRANSPORT_TYPE = 'odbc';
const ERROR_TYPE = 'fast';
const ERROR_MESSAGES = {
  CANT_CONNECT: 'Cannot Connect to IBMI',
  DEBUG_FLAG: 'Unable to process debug flag',
  PARAMETERS: 'Unable to create paramaters',
  SERVICE_PROGRAM_CALL: 'Unable to process new service program call',
  CONNECTION_OBJECT: 'Unable to create new connection object',
};
const SERVICE_TYPE = 'ds';
const DEFAULT_PROGRAM_LIBRARY = process.env.DEFAULT_PROGRAM_LIBRARY || 'UAEPGM';
const DEFAULT_DATASTRUCTURE = [
  {
    name: '',
    type: '',
    value: '',
    dictionaryValue: '',
  },
];

const BLANK_REQUEST = {
  type: '',
  dim: '',
  fields: [],
};

export {
  CONNECTION_DETAILS,
  TRANSPORT_TYPE,
  ERROR_TYPE,
  ERROR_MESSAGES,
  SERVICE_TYPE,
  DEFAULT_PROGRAM_LIBRARY,
  DEFAULT_DATASTRUCTURE,
  BLANK_REQUEST,
};
