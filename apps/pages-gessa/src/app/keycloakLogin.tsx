import React, { useEffect, useState } from 'react';
import keycloakData from '../keycloak/keycloak';
import keycloak from '../keycloak/keycloak';

export function KeycloakLogin({ children }: any) {
  const [initKeycloak, setInitKeycloak] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    debugger;
    keycloakData.init({ onLoad: 'login-required' }).then((authenticated) => {
      debugger;
      setInitKeycloak(keycloakData);
      setIsAuth(authenticated);
    });
  }, []);

  if (initKeycloak) {
    if (isAuth) return children;
    else return <div>Loading Keycloak...</div>;
  }
  return <div>Initializing Keycloak...</div>;
}

export default KeycloakLogin;
