import { createTheme, Theme } from '@mui/material';
import { ThemeProvider as MaterialThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import themes, { ITheme, ThemeContextType } from '../theme';

export const ThemeContext = React.createContext<ThemeContextType | null>(null);
const apiConst: any = {
  soulify: {
    btnColor: 'red',
  },
};

export const ThemeProvider: React.FC<React.ReactNode> | any = ({
  children,
}: any) => {
  const [theme, setTheme] = React.useState<Theme>(createTheme(themes.dark));
  const changeTheme = (theme: ITheme) => {
    setTheme(createTheme(theme));
  };
  /** fetch theme from backend */

  React.useEffect(() => {
    themes.default.palette = { ...themes.default.palette, ...apiConst };
    setTheme(createTheme(themes.default));
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
