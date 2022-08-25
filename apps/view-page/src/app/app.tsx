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
import DemoWrapper from './pages/projects/DemoWrapper';
export interface IAppProps {
  pageId: string;
}

export function App(props: IAppProps) {
  console.log(props);
  return (
    <MicroFrontendProvider>
      <ReduxProvider>
        <ThemeProvider>
          <SettingProvider>
            <AuthProvider>
              <RouteProvider>
                {/* <HashRouter> */}
                <StyledEngineProvider injectFirst>
                  <CssBaseline />
                  <DemoWrapper
                    page_id={props.pageId || '6306f5fa916c785f6ef1857a'}
                  />
                </StyledEngineProvider>
                {/* </HashRouter> */}
              </RouteProvider>
            </AuthProvider>
          </SettingProvider>
        </ThemeProvider>
      </ReduxProvider>
    </MicroFrontendProvider>
  );
}

export default App;
