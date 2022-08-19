import { Box, IconButton, InputBase, InputLabel, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/system';
import { ITheme } from '../../../../theme/index';

interface SearchInputTypes {
  label: string;
  backgroundColor: string;
  borderColor: string;
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
        {/* <InputLabel
          htmlFor="report-name"
          className="report_input_labels"
          sx={{ marginBottom: '5px' }}
        >
          {props.label}
        </InputLabel> */}
        <Paper
          component="form"
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            height: 34,
            width: '100%',
            background: props.backgroundColor,
            border: `1px solid ${props.borderColor}`,
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
              color: theme?.palette?.text?.disabled,
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
