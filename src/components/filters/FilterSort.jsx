import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { 
  CheckboxOption, 
  RadioOption,
  StatusSingleValue,
  GenresControl,
  GenresMultiValue,
  NoIndicator,
  NoSeparator,
  NoClear
} from './OptionComponents';

const URL = import.meta.env.VITE_API_URL;

const FilterSort = ({ setFilters, setSort }) => {
  const [genreOptions, setGenreOptions] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedSort, setSelectedSort] = useState(null);

  const statusOptions = [
    { value: '', label: 'All' },
    { value: 'Ended', label: 'Ended' },
    { value: 'Running', label: 'Running' },
    { value: 'To Be Determined', label: 'To Be Determined' },
  ];

  const sortOptions = [
    { value: '', label: 'No sort' },
    { value: 'name_asc', label: 'Name ascending' },
    { value: 'name_desc', label: 'Name descending' },
    { value: 'premiered_asc', label: 'Premiered ascending' },
    { value: 'premiered_desc', label: 'Premiered descending' },
  ];

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(`${URL}`);
        const data = await response.json();
        const allGenres = new Set();
        data.forEach(show =>
          show.genres.forEach(genre => allGenres.add(genre))
        );
        setGenreOptions([...allGenres].map(genre => ({ value: genre, label: genre })));
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };
    fetchGenres();
  }, []);

  const handleGenreChange = selectedGenres => {
    setSelectedGenres(selectedGenres);
    setFilters(prevFilters => ({
      ...prevFilters,
      genres: selectedGenres.map(genre => genre.value),
    }));
  };

  const handleSortChange = selected => {
    setSelectedSort(selected);
    if (selected?.value.includes('name')) {
      setSort({ field: 'name', order: selected.value.includes('asc') ? 'asc' : 'desc' });
    } else if (selected?.value.includes('premiered')) {
      setSort({ field: 'premiered', order: selected.value.includes('asc') ? 'asc' : 'desc' });
    } else {
      setSort({ field: '', order: '' });
    }
  };

  const handleStatusChange = selectedStatus => {
    setSelectedStatus(selectedStatus);
    setFilters(prevFilters => ({
      ...prevFilters,
      status: selectedStatus.value,
    }));
  };

  return (
    <div className='filter-sort'>
      <Select
        className={`sort-select ${selectedSort ? 'has-value' : ''}`}
        classNamePrefix="sort"
        options={sortOptions}
        value={selectedSort}
        onChange={handleSortChange}
        placeholder='No sort'
        isSearchable={false}
        components={{
          DropdownIndicator: NoIndicator,
          IndicatorSeparator: NoSeparator,
        }}
      />

      <Select
        className={`genres-select ${selectedGenres.length > 0 ? 'has-value' : ''}`}
        classNamePrefix="genres"
        options={genreOptions}
        isMulti
        value={selectedGenres}
        onChange={handleGenreChange}
        components={{ 
          Option: CheckboxOption,
          MultiValue: GenresMultiValue,
          Control: GenresControl,
          DropdownIndicator: NoIndicator,
          IndicatorSeparator: NoSeparator,
          ClearIndicator: NoClear,
        }}
        placeholder=''
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        isSearchable={false}
      />

      <Select
        className={`status-select ${selectedStatus ? 'has-value' : ''}`}
        classNamePrefix="status"
        options={statusOptions}
        value={selectedStatus}
        onChange={handleStatusChange}
        components={{
          Option: RadioOption, 
          SingleValue: StatusSingleValue,
          DropdownIndicator: NoIndicator,
          IndicatorSeparator: NoSeparator
        }}
        placeholder='Status filter'
        isSearchable={false}
      />
    </div>
  );
};

export default FilterSort;