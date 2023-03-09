import { useDispatch } from 'react-redux';
import { changeFilter } from 'redux/filterSlice';
import { FilterInput, FilterLabel } from './Filter.styled';

const Filter = () => {
  const dispatch = useDispatch();

  const handleInput = e => {
    const filterValue = e.target.value.trim().toLowerCase();
    dispatch(changeFilter(filterValue));
  };

  return (
    <FilterLabel>
      Find contacts by name
      <FilterInput type="text" name="name" onChange={handleInput} />
    </FilterLabel>
  );
};

export default Filter;
