import { Box, IconButton, InputBase, InputLabel, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/system';
import { ITheme } from '../../../../theme/index';

interface SearchInputTypes {
  label: string;
  value: string;
  onChange?: (e: any) => void;
}

function SearchInput(props: SearchInputTypes) {
  const theme: ITheme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        position: 'relative',
        width: '100%',
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
            background: theme?.palette?.background?.default,
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
              color: theme?.palette?.text?.primary,
            }}
            placeholder="Search"
            name="search"
            value={props.value}
            onChange={props?.onChange}
            inputProps={{ 'aria-label': 'search' }}
          />
        </Paper>
      </Box>
    </Box>
  );
}

export default SearchInput;
