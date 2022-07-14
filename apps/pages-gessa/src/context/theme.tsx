import { createTheme, Theme } from '@mui/material';
import { ThemeProvider as MaterialThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import themes, { ITheme, ThemeContextType } from '../theme';
import WebFont from 'webfontloader';

export const ThemeContext = React.createContext<ThemeContextType | null>(null);

export const ThemeProvider: React.FC<React.ReactNode> | any = ({
  children,
}: any) => {
  const [theme, setTheme] = React.useState<Theme>(createTheme(themes.default));
  const changeTheme = (theme: ITheme) => {
    setTheme(createTheme(theme));
  };
  const [posts, setPosts] = React.useState({});

  React.useEffect(() => {
    fetch(`http://localhost:3004/font`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        const result = res.json();
        return result;
      })
      .then((res) => {
        const WebFontConfig = {
          custom: {
            families: res?.families,
            urls: res?.urls,
          },
        };
        WebFont.load(WebFontConfig);
        themes.default.typography = {
          ...themes.default.typography,
          ...res.fonts,
        };
        setTheme(createTheme(themes.default));
      })
      .catch((error: any) => {
        console.log('error', error);
      });
  }, []);

  React.useEffect(() => {
    fetch(`http://localhost:3002/theme`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        const result = res.json();
        return result;
      })
      .then((res) => {
        setPosts(res);
        themes.default.palette = { ...themes.default.palette, ...res };
        setTheme(createTheme(themes.default));
      })
      .catch((error: any) => {
        console.log('error', error);
      });
  }, []);

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
