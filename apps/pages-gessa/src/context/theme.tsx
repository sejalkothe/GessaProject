import { createTheme, Theme } from '@mui/material';
import { ThemeProvider as MaterialThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import themes, { ITheme, ThemeContextType } from '../theme';
import WebFont from 'webfontloader';
import { useAppDispatch } from './redux';
import {
  getTheme,
  selectThemeContext,
  IRTheme,
  setThemeContext,
} from '../store/themeContextSlice';
import {
  getThemePalette,
  IRThemePalette,
  selectThemePaletteContext,
  setThemePaletteContext,
} from '../store/colorPalleteSlice';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store/index';

export const ThemeContext = React.createContext<ThemeContextType | null>(null);

export const ThemeProvider: React.FC<React.ReactNode> | any = ({
  children,
}: any) => {
  const [theme, setTheme] = React.useState<Theme>(createTheme(themes.default));
  const rootState = useSelector((state: IRootState) => state);
  const themeData = selectThemeContext(rootState);
  const themePaletteData = selectThemePaletteContext(rootState);
  const newUrl = window.location.href.replace('#', '');
  var url = new URL(newUrl);
  var projectId = url.searchParams.get('projectId');
  const dispatch = useDispatch();
  const changeTheme = (theme: ITheme) => {
    setTheme(createTheme(theme));
  };
  const [posts, setPosts] = React.useState({});
  const themeFunc = (projectId: any) => {
    const apicall = new Promise((resolve, reject) => {
      const someThunkCall = new Promise((resolve, reject) => {
        resolve(dispatch(getTheme(projectId)));
      }).then((res: any) => {
        if (res && res.payload && res.payload.data) {
          const themeObject: IRTheme = {
            project_id: '123',
            font: res.payload.data,
          };
          dispatch(setThemeContext(themeObject));
        }
      });
    });
  };

  const colorthemeFunc = (projectId: any) => {
    const apicall = new Promise((resolve, reject) => {
      const someThunkCall = new Promise((resolve, reject) => {
        resolve(dispatch(getThemePalette(projectId)));
      }).then((res: any) => {
        if (res && res.payload && res.payload.data) {
          const themeObject: IRThemePalette = {
            project_id: '123',
            color: res.payload.data,
          };

          dispatch(setThemePaletteContext(themeObject));
        }
      });
    });
  };

  React.useEffect(() => {
    const newUrl = window.location.href.replace('#', '');
    const projectId = newUrl?.split('&')?.shift?.()?.split('/')[5];
    themeFunc(projectId);
    colorthemeFunc(projectId);
  }, []);

  React.useEffect(() => {
    const WebFontConfig = {
      custom: {
        families: themeData[0]?.font?.result.families,
        urls: themeData[0]?.font?.result.urls,
      },
    };
    WebFont.load(WebFontConfig);
    themes.default.typography = {
      ...themes.default.typography,
      ...themeData[0]?.font?.result.fonts,
    };
    setTheme(createTheme(themes.default));
  }, [themeData]);

  React.useEffect(() => {
    setPosts(themePaletteData[0]?.color.result);
    themes.default.palette = {
      ...themes.default.palette,
      ...themePaletteData[0]?.color.result.colors,
    };
    setTheme(createTheme(themes.default));
  }, [themePaletteData]);

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      <MaterialThemeProvider theme={theme}>{children}</MaterialThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const settingContext = React.useContext(ThemeContext);

  return [settingContext?.theme, settingContext?.changeTheme];
};

export default ThemeProvider;
