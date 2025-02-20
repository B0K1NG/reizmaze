import reactLogo from '../assets/react.svg';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { useContext } from 'react';


const NavBar = () => {

    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <>
            <nav className={`navbar ${theme}`}>
                <div className="navbar-left">
                    <img src={reactLogo} alt="React Logo" />
                    <button onClick={toggleTheme}>
                        {theme === 'dark-theme' ? '🌞' : '🌙'}
                    </button>
                </div>
                <div className='navbar-right'>
                    <Link to={'/'}>HOME</Link>
                    <Link to={'/favorites'}>FAVORITES</Link>
                </div>
            </nav>
        </>
    )
}

export default NavBar