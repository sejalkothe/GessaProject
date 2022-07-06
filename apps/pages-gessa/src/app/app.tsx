import { CssBaseline } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import { HashRouter } from 'react-router-dom';
import {
  RouteProvider,
  SettingProvider,
  ThemeProvider,
  AuthProvider,
  MicroFrontendProvider,
  ReduxProvider,
} from '../context';

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
