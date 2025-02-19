import reactLogo from '../assets/react.svg'
import { Link } from 'react-router-dom'


const NavBar = () => {
    return (
        <>
            <nav className='navbar'>
                <div className="navbar-left">
                    {reactLogo}
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