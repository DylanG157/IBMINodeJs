import {
  STAR,
  HEAVY_CHECK_MARK,
  RED_CROSS,
  BROKEN_HEART,
  logFormattedResponse,
  logFormattedResponseBG,
  CONSOLE_SEPERATION_LINE_SINGLE,
  CHALK_RED,
  CHALK_WHITE,
  CHALK_GREEN,
  CHALK_BG_RED,
} from '../../constants/formatting-constants.js';
import {
  VALID_OBJECT,
  VALID_MAPPER_MAX_VALUE,
  VALID_MAPPER_MIN_VALUE,
  SERVICE_CHECKER_MESSAGES,
} from '../../constants/application-constants.js';
import { BLANK_REQUEST } from '../../constants/ibmi-constants.js';
import { ALL_SERVICES } from '../../core/domain-registration.js';
import {
  mapper1Data,
  mapper3Data,
  BANK_DESCRIPTION,
  SORT_CODE,
  BRAND_DESCRIPTION,
  BRAND_CODE,
  CLEAN_DATA_1_VALUE,
  CLEAN_DATA_3_VALUE,
} from '../test-data/xmlObjectMap.js';
import {
  mapDataFromObjectForArray1,
  mapDataFromObjectForArray3,
  cleanArray,
  determineObjectMapper,
} from '../mapping/ibmObjectMapper.js';

// import domain and add service object to the SERVICES array

function checkRequestResponseDS(object) {
  const errorArray = [];
  const service_keys = Object.keys(object);

  service_keys.forEach((serviceElement) => {
    // eslint-disable-next-line no-prototype-builtins
    const { request, response, hasRequest, hasResponse } =
      object[serviceElement];
    // eslint-disable-next-line no-restricted-globals
    if (hasRequest && (request === null || request === undefined)) {
      errorArray.push({
        service: serviceElement,
        message: SERVICE_CHECKER_MESSAGES.HAS_REQUEST_NO_REQUEST_OBJ,
      });
    } else if (hasRequest && (!request.type || !request.fields)) {
      errorArray.push({
        service: serviceElement,
        message: SERVICE_CHECKER_MESSAGES.MALFORM_REQUEST,
      });
    } else if (!hasRequest && request !== BLANK_REQUEST) {
      errorArray.push({
        service: serviceElement,
        message: SERVICE_CHECKER_MESSAGES.NOT_USING_DEFAULT_REQUEST,
      });
    } else if (hasResponse && (response === null || response === undefined)) {
      errorArray.push({
        service: serviceElement,
        message: SERVICE_CHECKER_MESSAGES.HAS_RESPONSE_NO_RESPONSE_OBJ,
      });
    } else if (hasResponse && (!response.type || !response.fields)) {
      errorArray.push({
        service: serviceElement,
        message: SERVICE_CHECKER_MESSAGES.MALFORM_RESPONSE,
      });
    }
  });
  return errorArray;
}

function checkMapperValueIsValid(object) {
  const errorArray = [];
  const service_keys = Object.keys(object);

  service_keys.forEach((serviceElement) => {
    // eslint-disable-next-line no-prototype-builtins
    const { mapperIndex } = object[serviceElement];
    // eslint-disable-next-line no-restricted-globals
    const isNanFlag = isNaN(mapperIndex);
    if (isNanFlag) {
      errorArray.push({
        service: serviceElement,
        message: SERVICE_CHECKER_MESSAGES.MAPPER_INDEX_NOT_VALID,
      });
    } else if (mapperIndex > VALID_MAPPER_MAX_VALUE) {
      errorArray.push({
        service: serviceElement,
        message: SERVICE_CHECKER_MESSAGES.MAPPER_INDEX_ABOVE_RANGE,
      });
    } else if (mapperIndex < VALID_MAPPER_MIN_VALUE) {
      errorArray.push({
        service: serviceElement,
        message: SERVICE_CHECKER_MESSAGES.MAPPER_INDEX_BELOW_RANGE,
      });
    }
  });
  return errorArray;
}

function checkAllFieldsArePresent(keys, object) {
  const errorArray = [];
  const service_keys = Object.keys(object);
  keys.forEach((element) => {
    service_keys.forEach((serviceElement) => {
      // eslint-disable-next-line no-prototype-builtins
      if (object[serviceElement][element] === undefined) {
        errorArray.push({ service: serviceElement, key: element });
      }
    });
  });
  return errorArray;
}

function determineLogging(
  arrayToCheck,
  serviceName,
  errorMessage,
  successMessage
) {
  if (arrayToCheck.length > 0) {
    logFormattedResponse(
      CHALK_RED,
      `${errorMessage} ${serviceName} ${RED_CROSS}`
    );
    arrayToCheck.forEach((element) => {
      logFormattedResponseBG(
        CHALK_WHITE,
        CHALK_BG_RED,
        `${BROKEN_HEART} Service:[ ${element.service}]:Missing Key / Message: ${
          element.key ? element.key : element.message
        } `
      );
    });
  } else {
    logFormattedResponse(
      CHALK_GREEN,
      `${successMessage} ${serviceName} ${HEAVY_CHECK_MARK}`
    );
  }
}

function checkServiceObjects(serviceName, serviceObject) {
  const valid_keys = Object.keys(VALID_OBJECT);
  const fieldsPresentCheck = checkAllFieldsArePresent(
    valid_keys,
    serviceObject
  );
  const mapperIndexValidCheck = checkMapperValueIsValid(serviceObject);
  const requestResponseCheck = checkRequestResponseDS(serviceObject);
  determineLogging(
    fieldsPresentCheck,
    serviceName,
    SERVICE_CHECKER_MESSAGES.MANDATORY_FIELDS_ERROR,
    SERVICE_CHECKER_MESSAGES.MANDATORY_FIELDS_SUCCESS
  );

  determineLogging(
    mapperIndexValidCheck,
    serviceName,
    SERVICE_CHECKER_MESSAGES.MAPPER_INDEX_ERROR,
    SERVICE_CHECKER_MESSAGES.MAPPER_INDEX_SUCCESS
  );

  determineLogging(
    requestResponseCheck,
    serviceName,
    SERVICE_CHECKER_MESSAGES.REQUEST_RESPONSE_ERROR,
    SERVICE_CHECKER_MESSAGES.REQUEST_RESPONSE_SUCCESS
  );

  return fieldsPresentCheck.concat(mapperIndexValidCheck);
}

function checkIBMObjectMapper3(errorArray, objectMapper3Data) {
  const ObjToCheck = objectMapper3Data[0]
    ? objectMapper3Data[0]
    : objectMapper3Data;

  if (
    ObjToCheck.branchdescription !== BANK_DESCRIPTION &&
    ObjToCheck.sortcode !== SORT_CODE
  ) {
    errorArray.push({
      service: 'mapDataFromObjectForArray3 function',
      message: SERVICE_CHECKER_MESSAGES.IBM_OBJ_MAPPER_NOT_VALID,
    });
  }
  return errorArray;
}

function checkIBMObjectMapper1(errorArray, objectMapper1Data) {
  if (
    objectMapper1Data[0].brandDescription !== BRAND_DESCRIPTION &&
    objectMapper1Data[0].brandCode !== BRAND_CODE
  ) {
    errorArray.push({
      service: 'mapDataFromObjectForArray1 function',
      message: SERVICE_CHECKER_MESSAGES.IBM_OBJ_MAPPER_NOT_VALID,
    });
  }
  return errorArray;
}
function checkIBMObjectMappers() {
  let errorArray = [];
  const objectMapper1Data = mapDataFromObjectForArray1(mapper1Data);
  const objectMapper3Data = mapDataFromObjectForArray3(mapper3Data);
  errorArray = checkIBMObjectMapper1(errorArray, objectMapper1Data);
  errorArray = checkIBMObjectMapper3(errorArray, objectMapper3Data);
  return errorArray;
}

function checkDetermineObjectMappers() {
  let errorArray = [];
  const objectMapper1Data = mapper1Data;
  const objectMapper3Data = mapper3Data;
  const mapper1 = determineObjectMapper(objectMapper1Data, 1);
  const mapper2 = determineObjectMapper(objectMapper3Data, 2);
  const mapper3 = determineObjectMapper(objectMapper3Data, 3);
  errorArray = checkIBMObjectMapper1(errorArray, mapper1);
  errorArray = checkIBMObjectMapper3(errorArray, mapper2);
  errorArray = checkIBMObjectMapper3(errorArray, mapper3);
  return errorArray;
}

function checkCleanArrayFunction() {
  const errorArray = [];
  const mapped3Data = mapDataFromObjectForArray3(mapper3Data);
  const mapped1Data = mapDataFromObjectForArray1(mapper1Data);
  const cleanData3 = cleanArray(mapped3Data);
  const cleanData1 = cleanArray(mapped1Data);
  if (
    cleanData3.length > CLEAN_DATA_3_VALUE ||
    cleanData1.length > CLEAN_DATA_1_VALUE
  ) {
    errorArray.push({
      service: 'cleanArray function',
      message: SERVICE_CHECKER_MESSAGES.CLEAN_ARR_INVALID,
    });
  }

  return errorArray;
}

function performCriticalFieldCheck(services) {
  services.forEach((element) => {
    console.log(`${CONSOLE_SEPERATION_LINE_SINGLE}`);
    logFormattedResponse(
      CHALK_WHITE,
      `${SERVICE_CHECKER_MESSAGES.PERFORMING_ANALYSIS_SERVICES} ${element.name} ${STAR}`
    );
    checkServiceObjects(element.name, element.key);
  });
}

function performMapperTests() {
  console.log(`${CONSOLE_SEPERATION_LINE_SINGLE}`);
  logFormattedResponse(
    CHALK_WHITE,
    `${SERVICE_CHECKER_MESSAGES.PERFORMING_ANALYSIS_FUNC} ${SERVICE_CHECKER_MESSAGES.IBM_OBJ_MAPPER} ${STAR}`
  );
  const mapperCheck = checkIBMObjectMappers();
  determineLogging(
    mapperCheck,
    SERVICE_CHECKER_MESSAGES.IBM_OBJ_MAPPER,
    SERVICE_CHECKER_MESSAGES.IBM_OBJ_MAPPER_ERROR,
    SERVICE_CHECKER_MESSAGES.IBM_OBJ_MAPPER_SUCCESS
  );

  console.log(`${CONSOLE_SEPERATION_LINE_SINGLE}`);
  logFormattedResponse(
    CHALK_WHITE,
    `${SERVICE_CHECKER_MESSAGES.PERFORMING_ANALYSIS_FUNC} ${SERVICE_CHECKER_MESSAGES.CLEAN_ARR_FUNCTION} ${STAR}`
  );

  const arrayCleanCheck = checkCleanArrayFunction();
  determineLogging(
    arrayCleanCheck,
    SERVICE_CHECKER_MESSAGES.CLEAN_ARR_FUNCTION,
    SERVICE_CHECKER_MESSAGES.CLEAN_ARR_INVALID,
    SERVICE_CHECKER_MESSAGES.FUNCTION_GENERAL
  );

  console.log(`${CONSOLE_SEPERATION_LINE_SINGLE}`);
  logFormattedResponse(
    CHALK_WHITE,
    `${SERVICE_CHECKER_MESSAGES.PERFORMING_ANALYSIS_FUNC} ${SERVICE_CHECKER_MESSAGES.DETERMINE_OBJ_MAPPER} ${STAR}`
  );

  const determineFunctionCheck = checkDetermineObjectMappers();
  determineLogging(
    determineFunctionCheck,
    SERVICE_CHECKER_MESSAGES.DETERMINE_OBJ_MAPPER,
    SERVICE_CHECKER_MESSAGES.DETERMINE_OBJ_MAPPER_ERROR,
    SERVICE_CHECKER_MESSAGES.FUNCTION_GENERAL
  );
}

performCriticalFieldCheck(ALL_SERVICES);
performMapperTests();
