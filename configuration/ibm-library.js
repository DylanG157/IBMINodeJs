//Removed for security purposes 

// Lib list that will be used on the ibmi
if (process.env.DB_IBMISYSTEM === _IBMI_NAME) {
  defaultEnvironmentLib = DEV_LIBL;
} else if (process.env.DB_IBMISYSTEM === _IBMI_NAME) {
  defaultEnvironmentLib = uaelibl;
} else if (process.env.DB_IBMISYSTEM === PRODUCTION_IBMI_NAME) {
  defaultEnvironmentLib = PRODUCTION_LIBL;
} else {
  defaultEnvironmentLib = uaelibl;
}

const DEFAULT_ENVIRONMENT_LIB = defaultEnvironmentLib;

export default DEFAULT_ENVIRONMENT_LIB;
