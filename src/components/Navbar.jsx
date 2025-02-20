import reizLogo from '../assets/logo.png';
import sunIcon from '../assets/sun.png';
import moonIcon from '../assets/moon.png';

import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { useContext } from 'react';


const NavBar = () => {

    const { theme, toggleTheme } = useContext(ThemeContext);
    const location = useLocation();

    return (
        <>
            <nav className={`navbar ${theme}`}>
                <div className="navbar__left">
                    <Link to={'/'}>
                        <img src={reizLogo} alt="React Logo" className='navbar__logo'/>
                    </Link>
                    <div 
                        className={`theme-slider ${theme === 'light-theme' ? 'light' : ''}`}
                        onClick={toggleTheme}
                    >   
                        <span className="theme-slider__icon theme-slider__icon--moon"><img src={moonIcon} alt="Dark" /></span>
                        <div className="theme-slider__button"></div>
                        <span className="theme-slider__icon theme-slider__icon--sun"><img src={sunIcon} alt="Light" /></span>
                        
                        
                    </div>
                </div>
                <div className='navbar__right'>
                    <Link 
                        to={'/'}
                        className={location.pathname === '/' ? 'active' : ''}
                    >
                        HOME
                    </Link>
                    <Link 
                        to={'/favorites'}
                        className={location.pathname === '/favorites' ? 'active' : ''}
                    >
                        FAVORITES
                    </Link>
                </div>
            </nav>
        </>
    )
}

export default NavBar