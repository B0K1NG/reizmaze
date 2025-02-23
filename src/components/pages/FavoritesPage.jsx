import noFavorites from '../../assets/no-favorites.png';

import React, { useContext } from "react";
import ShowCard from '../shows/ShowCard';
import { FavoritesContext } from '../../context/FavoritesContext';

const FavoritesPage = () => {
    const { favorites } = useContext(FavoritesContext);
    return (
        <div>
            {favorites.length === 0 ? (
                <img src={noFavorites} alt="No Favorites" className="not-found-page__image" />
            ) : (
                <div className='show-list'>
                    {favorites.map(show => (
                        <ShowCard key={show.id} show={show} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoritesPage;