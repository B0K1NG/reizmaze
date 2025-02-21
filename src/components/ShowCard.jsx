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

    const stripHtml = (html) => {
        return html ? html.replace(/<\/?[^>]+(>|$)/g, "") : "";
    };

    return (
        <div className='show-card'>
            <Link to={`/show/${show.id}`}>
                <img src={show.image?.medium} alt={show.name} />
            </Link>
            <div className="content">
                <div className="header">
                    <h3>{show.name}</h3>
                    <button onClick={toggleFavorite}>
                        {isFavorited ? 'Unfavorite' : 'Add to Favorites'}
                    </button>
                </div>
                
                <div className="summary">
                    {stripHtml(show.summary)?.substring(0, 100) + '...'}
                </div>

                <div className="footer">
                    <div className="rating">
                        <p>Rating</p>
                        <p>{show.rating?.average || 'N/A'} / 10</p>
                    </div>
                    <div className="genres">
                        <p>{show.genres?.join(", ") || 'N/A'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowCard;