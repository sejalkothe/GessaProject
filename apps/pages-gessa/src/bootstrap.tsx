import { StrictMode } from 'react';
import './main.css';
import App from './app/app';
import KeycloakLogin from './app/keycloakLogin';
import * as ReactDOM from 'react-dom';
import './main.css';
import keycloak from './keycloak/keycloak';


ReactDOM.render(
  <StrictMode>
  <KeycloakLogin />
   {/* <App /> */}
 </StrictMode>,
  document.getElementById('root')
  );