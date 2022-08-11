import React, { useEffect, useState } from 'react';
import keycloakData, { keycloakConfig } from '../keycloak/keycloak';
import { removeItem, setLocalStorage } from '../utils/localStorageService';
import keycloak from '../keycloak/keycloak';
import App from '../app/app';

export function KeycloakLogin({ children }: any) {
  const [initKeycloak, setInitKeycloak] = useState({});
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const newUrl = window.location.href.replace('#', '');
    var url = new URL(newUrl);
    var realm = url.searchParams.get("projectId");
    keycloakConfig.realm = realm || keycloakConfig.realm;
     keycloakData.init({ onLoad: 'login-required' }).then((authenticated: any) => {
           setInitKeycloak(keycloakData);
      setIsAuth(authenticated);
      const userInfo = {
        userName: '',
        sessionKey: keycloak.token || '',
        projectId:  keycloakConfig.realm
      };
      setLocalStorage('userInfo', userInfo);
    });
  }, []);

  if (initKeycloak) {
    if (isAuth) return <App />;
    else return <div>Loading Keycloak...</div>;
  }
  return <div>Initializing Keycloak...</div>;
}

export default KeycloakLogin;

