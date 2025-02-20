import { useState, useEffect } from 'react';
import ShowCard from './ShowCard';
import Pagination from './Pagination';
import ScrollToTop from './ScrollToTop';

const URL = import.meta.env.VITE_API_URL;

const ShowList = ({ filters, sort }) => {
  const [shows, setShows] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const [currentPage, setCurrentPage] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('page')) || 1;
  });
  const showsPerPage = 8;

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      setCurrentPage(parseInt(params.get('page')) || 1);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  ScrollToTop();

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch(URL);
        const data = await response.json();
        setShows(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchShows();
  }, []);

  useEffect(() => {
    let filtered = [...shows];

    if (filters.genres && filters.genres.length > 0) {
      filtered = filtered.filter(show =>
        show.genres.some(genre => filters.genres.includes(genre))
      );
    }

    if (filters.status) {
      filtered = filtered.filter(show => show.status === filters.status);
    }

    if (sort.field) {
      filtered.sort((a, b) => {
        if (sort.field === 'name') {
          return sort.order === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        } else if (sort.field === 'premiered') {
          return sort.order === 'asc'
            ? new Date(a.premiered) - new Date(b.premiered)
            : new Date(b.premiered) - new Date(a.premiered);
        }
        return 0;
      });
    }

    setFilteredShows(filtered);
  }, [shows, filters, sort]);

  const indexOfLastShow = currentPage * showsPerPage;
  const indexOfFirstShow = indexOfLastShow - showsPerPage;
  const currentShows = filteredShows.slice(indexOfFirstShow, indexOfFirstShow + showsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    const params = new URLSearchParams(window.location.search);
    params.set('page', pageNumber);
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className='show-list'>
        {currentShows.map(show => (
          <ShowCard key={show.id} show={show} />
        ))}
      </div>
      <Pagination
        showsPerPage={showsPerPage}
        totalShows={filteredShows.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </>
  );
};

export default ShowList;