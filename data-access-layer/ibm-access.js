import pkg from 'itoolkit-tih';
import logger from '../middleware/logger.js';
import xml2JsMapper from '../utilities/mapping/xml2js.js';
import {
  TRANSPORT_TYPE,
  ERROR_TYPE,
  ERROR_MESSAGES,
} from '../constants/ibmi-constants.js';

import {
  switchServiceObjectDomain,
  switchServiceObjectDomainMapperIndex,
} from '../core/domain-registration.js';

const { Connection } = pkg;
const { ProgramCall } = pkg;

function checkDebug(inputValues, toolkit) {
  try {
    const envDebugFlag = process.env.DEBUG_FLAG
      ? process.env.DEBUG_FLAG
      : false;
    toolkit.debug(envDebugFlag);
    if (!envDebugFlag) {
      const debugFlag = inputValues.header('debugFlag');
      const flag = !!(debugFlag && debugFlag === 'TRUE');
      toolkit.debug(flag);
    }
  } catch (error) {
    throw new Error(ERROR_MESSAGES.DEBUG_FLAG);
  }
  return toolkit;
}

function createParameters(program, serviceObject) {
  try {
    if (serviceObject.hasRequest) {
      program.addParam(serviceObject.request);
    }

    if (serviceObject.hasResponse) {
      program.addParam(serviceObject.response);
    }
  } catch (error) {
    throw new Error(ERROR_MESSAGES.DEBUG_FLAG);
  }
  return program;
}
function newServiceProgramCall(domainName, serviceName, toolkit, req) {
  try {
    const serviceObject = switchServiceObjectDomain(
      domainName,
      serviceName,
      req
    );
    const programLibrary = serviceObject.programLibl.toUpperCase();
    const programFunction = serviceObject.programFunction.toUpperCase();
    let program = new ProgramCall(serviceObject.programName, {
      lib: programLibrary,
      func: programFunction,
      error: ERROR_TYPE,
    });
    program = createParameters(program, serviceObject);
    toolkit.add(program);
    return toolkit;
  } catch (error) {
    throw new Error(ERROR_MESSAGES.SERVICE_PROGRAM_CALL);
  }
}

function createConnectionObject(connection) {
  try {
    const toolkit = new Connection({
      transport: TRANSPORT_TYPE,
      transportOptions: {
        odbcConnection: connection,
      },
    });
    return toolkit;
  } catch (error) {
    throw new Error(ERROR_MESSAGES.CONNECTION_OBJECT);
  }
}
async function makeCallToIbm(domainName, serviceName, req) {
  return new Promise((resolve, reject) => {
    if (connectionPool) {
      connectionPool.connect().then((connection) => {
        let toolkit = createConnectionObject(connection);
        toolkit = newServiceProgramCall(domainName, serviceName, toolkit, req);
        toolkit = checkDebug(req, toolkit);
        toolkit.run((error, xmlOutput) => {
          connection.close();
          if (error) {
            reject(error);
            throw new Error(ERROR_MESSAGES.CANT_CONNECT);
          } else {
            try {
              resolve(
                xml2JsMapper(
                  xmlOutput,
                  switchServiceObjectDomainMapperIndex(
                    domainName,
                    serviceName,
                    req
                  )
                )
              );
            } catch (xml2jserror) {
              reject(xml2jserror);
            }
          }
        });
      });
    } else {
      logger.error(ERROR_MESSAGES.CANT_CONNECT);
      reject(ERROR_MESSAGES.CANT_CONNECT);
      throw new Error(ERROR_MESSAGES.CANT_CONNECT);
    }
  });
}

export default makeCallToIbm;
