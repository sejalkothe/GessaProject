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
import { setLocalStorage } from '../utils/localStorageService';

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
    if (themeData && themeData.length > 0) {
    } else {
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
            setLocalStorage('fontData', themeObject);
          }
        });
      });
    }
  };

  const colorthemeFunc = (projectId: any) => {
    if (themePaletteData && themePaletteData.length > 0) {
    } else {
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
            setLocalStorage('colorData', themeObject);
          }
        });
      });
    }
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
      // text: {
      //   primary: '#101425',
      //   secondary: '#101425',
      //   disabled: '#636A75',
      //   c100: '#e2E7Ef',
      //   c50: '#101425',
      // },
      // primary: {
      //   dark: '#ffffff',
      //   main: '#131CA2',
      //   light: '#ffffff',
      //   c100: '#ffffff',
      //   c50: '#ffffff',
      // },
      // secondary: {
      //   dark: '#0B8BB8',
      //   main: '#00BDFF',
      //   light: '#94ddc4',
      //   c100: '#b3e7d5',
      //   c50: '#DFF7FF',
      // },
      // background: {
      //   default: '#F2F4F8',
      // },
      // dark: {
      //   dark: '#101425',
      //   main: '#332C2C ',
      //   light: '#594E4E',
      //   c100: '#877878',
      //   c50: '#EBE4E4',
      // },
      // light: {
      //   dark: '#EBE4E4',
      //   main: '#F0EBEB',
      //   light: '#F5F2F2 ',
      //   c100: '#E2E7EF',
      //   c50: '#FFFFFF',
      // },
      // systemColor1: {
      //   dark: '#CE1322',
      //   main: '#F62D38',
      //   light: '#FF4D4F',
      //   c100: '#FFA39E',
      //   c50: '#FFCCC7',
      // },
      // systemColor2: {
      //   dark: '#2F6E14',
      //   main: '#52C41A',
      //   light: '#95DE64',
      //   c100: '#8dda90',
      //   c50: '#D9F7BE',
      // },
      // systemColor3: {
      //   dark: '#1D39C4',
      //   main: '#2F54EB',
      //   light: '#597EF7',
      //   c100: '#DADDFB',
      //   c50: '#D6E4FF',
      // },
      // systemColor4: {
      //   dark: '#AD4E00',
      //   main: '#FA8C16',
      //   light: '#FFA940',
      //   c100: '#FFC069',
      //   c50: '#FFE7BA',
      // },
      // systemColor5: {
      //   dark: '#FADB14',
      //   main: '#FA8C16 ',
      //   light: '#FFEC3D',
      //   c100: '#FFF566',
      //   c50: '#FFFFB8',
      // },
      // systemColor6: {
      //   dark: '#131CA2',
      //   main: '#722ED1',
      //   light: '#B37FEB',
      //   c100: '#D3ADF7',
      //   c50: '#DADDFB',
      // },
      ...{
        chart: [
          '#ff6083',
          '#8b5cf6',
          '#fbbf24',
          '#84cc16',
          '#35a2ec',
          '#be123c',
          '#86efac',
          '#4bc1bd',
          '#64748b',
          '#a5f3fc',
          '#6b21a8',
          '#fecdd3',
          '#f87171',
          '#d9f99d',
          '#f0abfc',
          '#7f1d1d',
          '#c4b5fd',
        ],
      },
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
