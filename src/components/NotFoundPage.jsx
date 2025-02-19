import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {

        const navigate = useNavigate();

        const handleHome = () => {
            navigate('/');
        }

    return (
    <>
    <h1>404 Page</h1>
    <button onClick={handleHome}>Go Back Home</button>
    </>
    )

};

export default NotFoundPage;