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

export function App() {
  return (
    <ReduxProvider>
    <ThemeProvider>
      <SettingProvider>
        <AuthProvider>
          <MicroFrontendProvider>
           
              <RouteProvider>
                {/* <HashRouter> */}
                <StyledEngineProvider injectFirst>
                  <CssBaseline />
                </StyledEngineProvider>
                {/* </HashRouter> */}
              </RouteProvider>
        
          </MicroFrontendProvider>
        </AuthProvider>
      </SettingProvider>
    </ThemeProvider>
    </ReduxProvider>
  );
}

export default App;
