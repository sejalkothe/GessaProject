import Keycloak from 'keycloak-js';

const AUTH_SERVER_URL = process.env.NX_KEYCLOCK_AUTH_SERVER_URL;
const DATABASE = process.env.NX_KEYCLOCK_DATABASE;
const CLIENT_ID = process.env.NX_KEYCLOCK_CLIENT_ID;
const SECRET_KEY = process.env.NX_KEYCLOCK_SECRET_KEY;

const keycloakConfig = {
  url: AUTH_SERVER_URL,
  realm: DATABASE,
  clientId: CLIENT_ID,
};
const keycloak = Keycloak(keycloakConfig);
export default keycloak;
