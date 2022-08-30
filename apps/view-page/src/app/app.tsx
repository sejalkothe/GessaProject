import { CssBaseline } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import { useEffect } from 'react';
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

export function App(props: any) {
  useEffect(() => {
    // console.log('viwepage', props);
  }, [props]);
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
                    page_id={JSON.parse(JSON.stringify(props)).pageId}
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
