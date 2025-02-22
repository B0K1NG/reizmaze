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

    if (!show) return <div className="show-detail__loading">Loading...</div>;

    const stripHtml = (html) => {
        return html ? html.replace(/<\/?[^>]+(>|$)/g, "") : "";
    };

    return (
        <div className='show-detail'>
            <div className="show-detail__container">
                <div className="show-detail__image-container">
                    <img src={show.image?.original} alt={show.name} className="show-detail__image" />
                </div>
                
                <div className="show-detail__content">
                    <div className="show-detail__header">
                        <h1 className="show-detail__title">{show.name}</h1>
                        <button 
                            onClick={toggleFavorite} 
                            className={`show-detail__favorite-btn ${isFavorited ? 'favorited' : ''}`}
                        >
                            {isFavorited ? 'Favorite' : 'Add to Favorites'}
                        </button>
                        <div className="show-detail__summary">
                            {stripHtml(show.summary)}
                        </div>
                    </div>
                    <div className="show-detail__info">
                        <div className="show-detail__info-item">
                            <span className="show-detail__info-label">Premiered:</span>
                            <span className="show-detail__info-value">{formatDate(show.premiered)}</span>
                        </div>
                        {show.ended && (
                            <div className="show-detail__info-item">
                                <span className="show-detail__info-label">Ended:</span>
                                <span className="show-detail__info-value">{formatDate(show.ended)}</span>
                            </div>
                        )}
                        <div className="show-detail__info-item">
                            <span className="show-detail__info-label">Show status:</span>
                            <span className="show-detail__info-value">{show.ended ? 'Ended' : 'Ongoing'}</span>
                        </div>
                        <div className="show-detail__info-item">
                            <span className="show-detail__info-label">Language:</span>
                            <span className="show-detail__info-value">{show.language}</span>
                        </div>
                        <div className="show-detail__info-item">
                            <span className="show-detail__info-label">Average rating:</span>
                            <span className="show-detail__info-value">{show.rating.average}</span>
                        </div>
                        <div className="show-detail__info-item">
                            <span className="show-detail__info-label">Average runtime:</span>
                            <span className="show-detail__info-value">{show.averageRuntime} minutes</span>
                        </div>
                        <div className="show-detail__info-item">
                            <span className="show-detail__info-label">Official site:</span>
                            <a href={show.officialSite} className="show-detail__link" target="_blank" rel="noopener noreferrer">
                                Go to official site
                            </a>
                        </div>
                        <div className="show-detail__info-item">
                            <span className="show-detail__info-label">Genres:</span>
                            <span className="show-detail__info-value">{show.genres.join(', ')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowDetail;