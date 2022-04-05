import {
  getStaticServiceObject,
  STATIC_SERVICES,
  STATIC_DOMAIN,
} from './service-calls/static-services.js';


import { APP_ERROR_MESSAGES } from '../constants/application-constants.js';

const DOMAIN_NAMES = {
  LANGUAGE_DOMAIN, 
};
// used for validation of services
const ALL_SERVICES = [
  {
    name: 'LANGUAGE_SERVICES',
    key: LANGUAGE_SERVICES,
  },
];

function switchServiceObjectDomain(domain, serviceName, req) {
  let serviceObject = [];
  try {
    switch (domain) {
      case STATIC_DOMAIN:
        serviceObject = getServiceObject(req, serviceName);
        break;

      default:
        serviceObject = null;
        break;
    }
    return serviceObject;
  } catch (error) {
    throw new Error(
      `${APP_ERROR_MESSAGES.CANT_GET_SERVICE_DOMAIN + domain}:${serviceName}`
    );
  }
}

function switchServiceObjectDomainMapperIndex(domain, serviceName, req) {
  let serviceObject = [];
  try {
    switch (domain) {
      case STATIC_DOMAIN:
        serviceObject = getServiceObject(req, serviceName).mapperIndex;
        break;

      default:
        serviceObject = null;
        break;
    }
    return serviceObject;
  } catch (error) {
    throw new Error(
      `${
        APP_ERROR_MESSAGES.CANT_GET_SERVICE_MAPPER_DOMAIN + domain
      }:${serviceName}`
    );
  }
}

export {
  switchServiceObjectDomain,
  switchServiceObjectDomainMapperIndex,
  ALL_SERVICES,
  DOMAIN_NAMES,
};
