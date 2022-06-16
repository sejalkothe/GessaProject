import { CssBaseline } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import { HashRouter } from 'react-router-dom';
/* import keycloak from '../keycloak/keycloak'; */
import {
  RouteProvider,
  SettingProvider,
  ThemeProvider,
  AuthProvider,
  MicroFrontendProvider,
  ReduxProvider,
} from '../context';
import LayoutWrapper from './layout/layout';
import AppLayout from './layouts/AppLayout';

export function App() {
  return (
    <ThemeProvider>
      <SettingProvider>
        <AuthProvider>
          <MicroFrontendProvider>
            <ReduxProvider>
              <RouteProvider>
                <HashRouter>
                  <StyledEngineProvider injectFirst>
                    <CssBaseline />
                    <AppLayout />
                    {/* <LayoutWrapper></LayoutWrapper> */}
                  </StyledEngineProvider>
                </HashRouter>
              </RouteProvider>
            </ReduxProvider>
          </MicroFrontendProvider>
        </AuthProvider>
      </SettingProvider>
    </ThemeProvider>
  );
}

export default App;
