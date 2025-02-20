import React, { useState } from 'react';

import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import ShowList from './components/Showlist';
import FilterSort from './components/FilterSort';


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
