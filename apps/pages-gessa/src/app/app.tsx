// import { CssBaseline } from '@mui/material';
import { CssBaseline } from '@material-ui/core';
import { StyledEngineProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { HashRouter, useParams } from 'react-router-dom';
import {
  RouteProvider,
  SettingProvider,
  ThemeProvider,
  AuthProvider,
  MicroFrontendProvider,
  ReduxProvider,
  KeycloakProvider,
} from '../context';
import keycloak from '../keycloak/keycloak';
import { setLocalStorage } from '../utils/localStorageService';
import LayoutWrapper from './layout/layout';
import ProjectWrapper from './pages/projects/component/ProjectWrapper';

const keycloakProviderInitConfig = {
  onLoad: 'login-required',
};

export function App() {
  const [initKeycloak, setInitKeycloak] = useState(false);
  const [_keycloak, setKeycloak] = useState<any>({});
  const params = useParams();
  useEffect(() => {
    const newUrl = window.location.href.replace('#', '');
    const url = newUrl?.split('&')?.shift?.()?.split('/')[5];
    keycloak.realm = url || keycloak.realm;
    setKeycloak(keycloak);
  }, []);

  const onKeycloakEvent = (event: any, error: any) => {
    // On Logout
    if (event === 'onAuthLogout') {
      // Cleanup stored Keycloak realm name
      localStorage.removeItem('userInfo');
      setInitKeycloak(false);

      // Cleanup keycloak instance
      // setState({
      //   keycloak: null
      // });
      if (event === 'keyCloakExists') {
        setInitKeycloak(true);
      }
    }
  };

  const onKeycloakTokens = (tokens: any) => {
    const userInfo = {
      userName:
        (keycloak && keycloak.tokenParsed && keycloak.tokenParsed?.name) || '',
      sessionKey: tokens.token || '',
      projectId: params.projectId || '',
      email:
        (keycloak && keycloak.tokenParsed && keycloak.tokenParsed?.email) || '',
      data: tokens,
    };
    setLocalStorage('userInfo', userInfo);
    setInitKeycloak(true);
  };

  return (
    <KeycloakProvider
      keycloak={keycloak}
      initConfig={keycloakProviderInitConfig}
      onEvent={onKeycloakEvent}
      onTokens={onKeycloakTokens}
    >
      {initKeycloak && (
        <MicroFrontendProvider>
          <ReduxProvider>
            <ThemeProvider>
              <SettingProvider>
                <AuthProvider>
                  <RouteProvider>
                    <HashRouter>
                      <StyledEngineProvider injectFirst>
                        <CssBaseline />
                        {/* <div>Hello</div> */}
                        <LayoutWrapper />
                      </StyledEngineProvider>
                    </HashRouter>
                  </RouteProvider>
                </AuthProvider>
              </SettingProvider>
            </ThemeProvider>
          </ReduxProvider>
        </MicroFrontendProvider>
      )}
    </KeycloakProvider>
  );
}

export default App;
