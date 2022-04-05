import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import blocked from 'blocked';
// eslint-disable-next-line import/no-extraneous-dependencies
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import debug from 'debug';
import ibmiConnectionPoolSetup from './configuration/connectionPool.js';
import httpLogger from './middleware/httpLogger.js';
import logger from './middleware/logger.js';

import {
  errorLogger,
  errorResponder,
  failSafeHandler,
} from './middleware/error-handler.js';

import { haltOnTimedout, timeout120 } from './middleware/timeout-handler.js';

dotenv.config({ silent: process.env.NODE_ENV !== 'production' });
const port = process.env.DB_PORT;

// IBMI ODBC pool connection
ibmiConnectionPoolSetup();
const app = express();
// Disabling feature that forces https for now until we have SSL certificates
const cspDefaults = helmet.contentSecurityPolicy.getDefaultDirectives();
delete cspDefaults['upgrade-insecure-requests'];
app.use(
  helmet({
    contentSecurityPolicy: { directives: cspDefaults },
  })
);

app.use(cors());
// This is used to speed up our response api's
app.use(compression());
app.use(bodyParser.json());
app.use(httpLogger);
debug(`processId:${process.pid}server registering endpoints`);
app.use('/api/authentication', authenticationRouter);
app.use('/api/static', staticRouter);
debug(`processId:${process.pid}registering middleware`);
app.use(errorLogger);
app.use(errorResponder);
app.use(failSafeHandler);
app.use(timeout120);
app.use(haltOnTimedout);
app.listen(port, () => {
  blocked(
    (ms) => {
      debug.debug(`WARNING event loop was blocked for ${ms}ms`);
    },
    { threshold: 50 }
  );
  logger.info(`Server running on port: ${port}`);
});
