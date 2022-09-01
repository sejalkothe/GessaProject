import { Box, IconButton, InputBase, InputLabel, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/system';
import { useState } from 'react';
import { ITheme } from 'apps/pages-gessa/src/theme';

export interface ISearchInputTypes {
  label: string;
  placeholder: string;
  value: string;
  onChange?: (e: any) => void;
}

export const SearchInput = (props: ISearchInputTypes) => {
  const [searchText, setSearchText] = useState<string>('');
  const theme: ITheme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        position: 'relative',
        width: '100%',
        background: theme.palette?.light?.c50,
      }}
      className="Search_Field"
    >
      <Box sx={{ position: 'relative', width: '100%' }}>
        <Paper
          component="form"
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            height: 34,
            width: '100%',
            background: theme.palette?.light?.c50,
            border: `1px solid ${theme.palette?.text?.c100}`,
            boxShadow: 'none',
          }}
        >
          <IconButton sx={{ p: '10px' }} aria-label="search">
            <SearchIcon
              sx={{
                color: theme?.palette?.text?.disabled,
              }}
            />
          </IconButton>
          <InputBase
            sx={{
              fontWeight: '400',
              ml: 1,
              flex: 1,
              y: 25,
              fontSize: '12px',
              background: theme.palette?.light?.c50,
              color: theme?.palette?.text?.primary,
            }}
            placeholder={props.placeholder}
            value={searchText}
            name="search"
            onChange={(e: any) => {
              setSearchText(e.target.value);
              props && props.onChange && props.onChange(e.target.value);
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default SearchInput;
