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
import ProjectContainer from '../app/pages/projects/Project';
import AppLayout from './layouts/AppLayout';

export function App() {
  return (
    <MicroFrontendProvider>
      <ReduxProvider>
        <ThemeProvider>
          <SettingProvider>
            <AuthProvider>
              <RouteProvider>
                <HashRouter>
                  <StyledEngineProvider injectFirst>
                    <CssBaseline />
                    <ProjectContainer />
                  </StyledEngineProvider>
                </HashRouter>
              </RouteProvider>
            </AuthProvider>
          </SettingProvider>
        </ThemeProvider>
      </ReduxProvider>
    </MicroFrontendProvider>
  );
}

export default App;
