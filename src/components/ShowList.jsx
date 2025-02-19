import { useState, useEffect } from 'react';
import ShowCard from './ShowCard';
import Pagination from './Pagination';
import ScrollToTop from './ScrollToTop';

const URL = import.meta.env.VITE_API_URL;

const ShowList = () => {
  const [shows, setShows] = useState([]);
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
}, [])

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

  const indexOfLastShow = currentPage * showsPerPage;
  const indexOfFirstShow = indexOfLastShow - showsPerPage;
  const currentShows = shows.slice(indexOfFirstShow, indexOfLastShow);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    const params = new URLSearchParams(window.location.search);
    params.set('page', pageNumber);
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
    window.scrollTo(0, 0);
  }
  
    return (
    <>
    <div className='show-list'>
      {currentShows.map((show) => (
        <ShowCard key={show.id} show={show} />
      ))}
    </div>
    <Pagination 
      showsPerPage={showsPerPage}
      totalShows={shows.length}
      paginate={paginate}
      currentPage={currentPage}
    />
    </>
  );
};

export default ShowList;