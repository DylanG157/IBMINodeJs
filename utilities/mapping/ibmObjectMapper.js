import { APP_ERROR_MESSAGES } from '../../constants/application-constants.js';

function mapDataFromObjectForArray1(jsonArrayObj) {
  try {
    const firstObj = jsonArrayObj.myscript.pgm[0].parm[0];
    const dataToReturn = firstObj.ds.map((dataElement) => {
      const container = {};
      // eslint-disable-next-line no-return-assign
      dataElement.data.map(
        (element) => (container[element.$.name] = element._)
      );
      return container;
    });
    return dataToReturn;
  } catch (error) {
    throw new Error(APP_ERROR_MESSAGES.CANT_EXE_MAPPER_FUNC);
  }
}

function mapDataFromObjectForArray3(result, index) {
  try {
    const firstObj = result.myscript.pgm[0].parm[1];
    const objectArray = firstObj.ds.map((dataElement) => {
      const container = {};
      // eslint-disable-next-line no-return-assign
      dataElement.data.map(
        (element) => (container[element.$.name] = element._)
      );
      return container;
    });
    if (index === 3) {
      return objectArray[0];
    }
    return objectArray;
  } catch (error) {
    throw new Error(APP_ERROR_MESSAGES.CANT_EXE_MAPPER_FUNC);
  }
}

function mapDataFromObjectForArray4(result, index) {
  try {
    const firstObj = result.myscript.pgm[0].parm[1];
    let errorStatusFromIBMI = 'N';
    const objectArray = firstObj.ds.map((dataElement) => {
      const container = {};
      // eslint-disable-next-line no-return-assign
      dataElement.data.map((element) => {
        if (element.$.name === 'ErrorStatus' && element._ !== undefined) {
          errorStatusFromIBMI = element._;
        }

        if (
          (errorStatusFromIBMI === 'Y' && element.$.name === 'ErrorStatus') ||
          (errorStatusFromIBMI === 'Y' && element.$.name === 'ErrorMessage') ||
          (errorStatusFromIBMI === 'Y' &&
            element.$.name === 'RelatedProgram') ||
          (errorStatusFromIBMI === 'Y' && element.$.name === 'RelatedProcedure')
        ) {
          container[element.$.name] = element._;
        }
        if (
          errorStatusFromIBMI !== 'Y' &&
          element.$.name !== 'ErrorStatus' &&
          element.$.name !== 'ErrorMessage' &&
          element.$.name !== 'RelatedProgram' &&
          element.$.name !== 'RelatedProcedure'
        ) {
          container[element.$.name] = element._ || ' ';
        }
      });
      return container;
    });
    if (index === 4) {
      return objectArray[0];
    }
    return objectArray;
  } catch (error) {
    throw new Error(APP_ERROR_MESSAGES.CANT_EXE_MAPPER_FUNC);
  }
}

function cleanArray(response) {
  try {
    const keyList = Object.keys(response[0]);
    const cleanResponse = response.filter(
      (element) => element[keyList[0]] !== undefined
    );
    return cleanResponse;
  } catch (error) {
    throw new Error(APP_ERROR_MESSAGES.CANT_EXE_CLEAN_ARR_FUNC);
  }
}
function determineObjectMapper(result, index) {
  let response = [];
  try {
    switch (index) {
      case 1:
        response = mapDataFromObjectForArray1(result);
        break;

      case 2:
        response = mapDataFromObjectForArray3(result, index);
        break;

      case 3:
        response = mapDataFromObjectForArray3(result, index);
        break;

      case 4:
        response = mapDataFromObjectForArray4(result, index);
        break;

      default:
        response = mapDataFromObjectForArray1(result);
        break;
    }
    if (index !== 4) {
      let cleanResponse = [];
      cleanResponse = cleanArray(response);
      return cleanResponse;
    }
    return response;
  } catch (error) {
    throw new Error(APP_ERROR_MESSAGES.CANT_DET_OBJ_MAPPER);
  }
}

export {
  determineObjectMapper,
  mapDataFromObjectForArray1,
  mapDataFromObjectForArray3,
  cleanArray,
};
