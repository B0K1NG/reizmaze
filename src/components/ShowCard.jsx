import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FavoritesContext } from '../context/FavoritesContext';

const ShowCard = ({ show, onFavoriteChange }) => {
    const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext);
    const [isFavorited, setIsFavorited] = useState(false);

    useEffect(() => {
        setIsFavorited(isFavorite(show.id));
    }, [isFavorite, show.id]);

    const toggleFavorite = () => {
        if (isFavorited) {
            removeFavorite(show.id);
        } else {
            addFavorite(show);
        }
        setIsFavorited(!isFavorited);
        if (onFavoriteChange) {
            onFavoriteChange();
        }
    };

    return (
        <div className='show-card'>
            <Link to={`/show/${show.id}`}>
                <img src={show.image?.medium} alt={show.name} />
                <h3>{show.name}</h3>
                <div dangerouslySetInnerHTML={{ __html: show.summary?.substring(0, 100) + '...' }}></div>
                <p>Rating: {show.rating?.average} / 10</p>
                <p>Genres: {show.genres?.join(", ")}</p>
            </Link>
            <button onClick={toggleFavorite}>
                {isFavorited ? 'Unfavorite' : 'Add to Favorites'}
            </button>
        </div>
    );
};

export default ShowCard;