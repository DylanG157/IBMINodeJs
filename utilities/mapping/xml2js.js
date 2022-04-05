import { parseString } from 'xml2js';
import logger from '../../middleware/logger.js';
import { determineObjectMapper } from './ibmObjectMapper.js';
import { APP_ERROR_MESSAGES } from '../../constants/application-constants.js';

function xml2JsMapper(xmlOutput, mapperIndex) {
  let MainResponse = [];
  try {
    parseString(
      xmlOutput.replace(/&(?!(?:apos|quot|[gl]t|amp);|#)/g, '&amp;'),
      (parseError, result) => {
        if (parseError) {
          throw new Error(APP_ERROR_MESSAGES.CANT_EXE_XML2JS);
        }
        logger.info(JSON.stringify(result));
        MainResponse = determineObjectMapper(result, mapperIndex);
      }
    );
  } catch (xmlerror) {
    logger.error(xmlerror);
    throw new Error(APP_ERROR_MESSAGES.CANT_EXE_XML2JS);
  }
  return MainResponse;
}

export default xml2JsMapper;
