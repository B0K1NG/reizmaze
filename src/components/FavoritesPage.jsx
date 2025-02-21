import React, { useContext } from "react";
import ShowCard from './ShowCard';
import { FavoritesContext } from '../context/FavoritesContext';

const FavoritesPage = () => {
    const { favorites } = useContext(FavoritesContext);
// Make this one more interesting
    return (
        <div>
            {favorites.length === 0 ? (
                <p>No favorites yet</p>
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