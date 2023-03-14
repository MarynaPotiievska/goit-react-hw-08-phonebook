import { FormControl, OutlinedInput, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch } from 'react-redux';
import { changeFilter } from 'redux/filterSlice';

const Filter = () => {
  const dispatch = useDispatch();

  const handleInput = e => {
    const filterValue = e.target.value.trim().toLowerCase();
    console.log(filterValue);
    dispatch(changeFilter(filterValue));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: '32px',
        mb: '16px',
        padding: '12px',
      }}
    >
      <Typography>Find contacts by name</Typography>
      <FormControl size="small">
        <OutlinedInput
          autoComplete="off"
          name="filter"
          onChange={handleInput}
        />
      </FormControl>
    </Box>
  );
};

export default Filter;
