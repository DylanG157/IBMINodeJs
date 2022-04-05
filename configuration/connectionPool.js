import odbc from 'odbc';
import { CONNECTION_DETAILS } from '../constants/ibmi-constants.js';
import logger from '../middleware/logger.js';

async function ibmiConnectionPoolSetup() {
  global.connectionPool = await odbc
    .pool({
      connectionString: `${CONNECTION_DETAILS}${process.env.DB_IBMISYSTEM};UID=${process.env.DB_IBMIDBUSER};Password=${process.env.DB_IBMIDBPASSWORD}`,
      connectionTimeout: Number(
        process.env.ODBC_CONNECTIONTIMEOUT.replace(/['"]+/g, '')
      ), // Used to remove the quotes and convert to number
      loginTimeout: Number(process.env.ODBC_LOGINTIMEOUT.replace(/['"]+/g, '')),
      initialSize: Number(process.env.ODBC_INITIALSIZE.replace(/['"]+/g, '')),
      incrementSize: Number(
        process.env.ODBC_INCREMENTSIZE.replace(/['"]+/g, '')
      ),
      maxSize: Number(process.env.ODBC_MAXSIZE.replace(/['"]+/g, '')),
      shrink: process.env.ODBC_SHRINK.replace(/['"]+/g, '') === 'true', // Remove the quotes and convert back to boolean
      reuseConnections:
        process.env.ODBC_REUSECONNECTIONS.replace(/['"]+/g, '') === 'true', // Remove the quotes and convert back to boolean
    })
    .catch((error) => {
      logger.info(
        `Something went wrong setting up connection pool with the ibmi: ${error}`
      );
      process.exit(1);
    });
  logger.info(global.connectionPool);
  logger.info('Pool Connection Setup');
}

export default ibmiConnectionPoolSetup;
