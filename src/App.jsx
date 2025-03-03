import React, { useState } from 'react';
import './App.css';

import ShowList from './components/shows/ShowList';
import FilterSort from './components/filters/FilterSort';


function App() {
  const [filters, setFilters] = useState({ genres: [], status: '' });
  const [sort, setSort] = useState({ field: '', direction: '' });
  

  return (
    <>
      <div>
        <FilterSort setFilters={setFilters} setSort={setSort} />
        <ShowList filters={filters} sort={sort} />
      </div>
    </>
  )
}

export default App
