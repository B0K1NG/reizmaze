import React, { useState, useEffect } from 'react';
import Select, { components } from 'react-select';
import { CheckboxOption, RadioOption } from './OptionComponents';

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
        const response = await fetch('https://api.tvmaze.com/shows');
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
    if (selected.value.includes('name')) {
      setSort({ field: 'name', order: selected.value.includes('asc') ? 'asc' : 'desc' });
    } else if (selected.value.includes('premiered')) {
      setSort({ field: 'premiered', order: selected.value.includes('asc') ? 'asc' : 'desc' });
    }
  };

  const handleStatusChange = selectedStatus => {
    setSelectedStatus(selectedStatus);
    setFilters(prevFilters => ({
      ...prevFilters,
      status: selectedStatus.value,
    }));
  };

  const StatusSingleValue = ({ children, ...props }) => (
    <components.SingleValue {...props}>
      Status filter
    </components.SingleValue>
  );

  const GenresMultiValue = () => null;

  const GenresControl = ({ children, ...props }) => (
    <components.Control {...props}>
      <span className='genres'>
        Genres filter ({selectedGenres.length})
      </span>
      {children}
    </components.Control>
  );

  return (
    <div className={'filter-sort'}>
      <Select
        options={sortOptions}
        value={selectedSort}
        onChange={handleSortChange}
        placeholder='No sort'
        isSearchable={false}
      />
      <Select
        options={genreOptions}
        isMulti
        value={selectedGenres}
        onChange={handleGenreChange}
        components={{ 
          Option: CheckboxOption,
          MultiValue: GenresMultiValue,
          Control: GenresControl
        }}
        placeholder=''
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        isSearchable={false}
      />
      <Select
        options={statusOptions}
        value={selectedStatus}
        onChange={handleStatusChange}
        components={{ Option: RadioOption, SingleValue: StatusSingleValue }}
        placeholder='Status filter'
        isSearchable={false}
      />
    </div>
  );
};

export default FilterSort;