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
import LayoutWrapper from './layout/layout';
import ProjectWrapper from './pages/projects/component/ProjectWrapper';

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
                    <LayoutWrapper />
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
