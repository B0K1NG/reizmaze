import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { FavoritesContext } from '../context/FavoritesContext';

const URL = import.meta.env.VITE_API_URL;

const ShowDetail = () => {
    const { id } = useParams();
    const [show, setShow] = useState(null);
    const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext);
    const [isFavorited, setIsFavorited] = useState(false);

    useEffect(() => {
        const fetchShow = async () => {
            try {
                const response = await fetch(`${URL}/${id}`);
                const data = await response.json();
                setShow(data);
                setIsFavorited(isFavorite(data.id));
            } catch (error) {
                console.log(error);
            }
        };
        fetchShow();
    }, [id, isFavorite]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', weekday: 'short' };
        return new Date(dateString).toLocaleDateString(undefined, options).replace(/,/g, '');
    };

    const toggleFavorite = () => {
        if (isFavorited) {
            removeFavorite(show.id);
        } else {
            addFavorite(show);
        }
        setIsFavorited(!isFavorited);
    };

    if (!show) return <div>Loading...</div>;

    return (
        <div className='show-detail'>
            <img src={show.image?.medium} alt={show.name} />
            <h1>{show.name}</h1>
            <button onClick={toggleFavorite}>
                {isFavorited ? 'Unfavorite' : 'Add to Favorites'}
            </button>
            <p dangerouslySetInnerHTML={{ __html: show.summary }}></p>
            <p>Premiered: {formatDate(show.premiered)}</p>
            <p>{show.ended ? `Ended: ${formatDate(show.ended)}` : ''}</p>
            <p>Show status: {show.ended ? 'Ended' : 'Ongoing'}</p>
            <p>Language: {show.language}</p>
            <p>Average rating: {show.rating.average}</p>
            <p>Official site: {show.officialSite && <a href={show.officialSite} target='_blank' rel="noopener noreferrer">Go to official site</a>}</p>
            <p>Genres: {show.genres?.join(", ")}</p>
        </div>
    );
};

export default ShowDetail;