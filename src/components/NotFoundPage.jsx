import notFoundImg from '../assets/not-found.png';
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {

    const navigate = useNavigate();

    const handleHome = () => {
        navigate('/');
    }

    return (
        <div className="not-found-page">
        <div className="not-found-page__content">
            <h1>Channel Not Found!</h1>
            <p>Looks like we're experiencing technical difficulties. 
            This page is currently unavailable on all frequencies.
            </p>
            <button onClick={handleHome}>Return to Regular Browsing→</button>
        </div>
        <img src={notFoundImg} alt="Not Found" className="not-found-page__image" />
        </div>
    );
};

export default NotFoundPage;