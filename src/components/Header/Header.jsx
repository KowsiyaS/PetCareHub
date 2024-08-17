import { Link } from "react-router-dom";
import "./Header.scss";

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
    const logOut = () => {
        sessionStorage.removeItem("authToken");
        setIsLoggedIn(false);
    };

    return isLoggedIn ? (
        <header className="header">
            <nav className="header__nav">
                <Link to="/dashboard" className="header__link">
                    Calendar
                </Link>
                <Link to="/findvet" className="header__link">
                    Find a Vet
                </Link>
                <Link to="/upload-record" className="header__link">
                    Upload Record
                </Link>
                <Link to="/" className="header__link" onClick={logOut}>
                    Logout
                </Link>
            </nav>
        </header>
    ) : (
        <header className="header">
            <nav className="header__nav">
                <Link to="/login" className="header__link">
                    Login
                </Link>
                <Link to="/register" className="header__link">
                    Sign Up
                </Link>
            </nav>
        </header>
    );
};

export default Header;
