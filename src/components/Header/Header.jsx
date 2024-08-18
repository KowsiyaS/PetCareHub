import { Link } from "react-router-dom";
import pawprint from "../../assets/images/footprint.png";
import "./Header.scss";

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
    const logOut = () => {
        sessionStorage.removeItem("authToken");
        setIsLoggedIn(false);
    };

    return isLoggedIn ? (
        <header className="header">
            <nav className="header__nav">
                <div>
                    <Link to="/dashboard">
                        <img src={pawprint} />
                    </Link>
                </div>
                <div>
                    <Link to="/findvet" className="header__link">
                        Find a Vet
                    </Link>
                    <Link to="/upload-record" className="header__link">
                        Upload Record
                    </Link>
                    <Link to="/" className="header__link" onClick={logOut}>
                        Logout
                    </Link>
                </div>
            </nav>
        </header>
    ) : (
        <header className="header">
            <nav className="header__nav">
                <div>
                    <Link to="/">
                        <img src={pawprint} className="header__icon" />
                    </Link>
                </div>
                <div>
                    <Link to="/login" className="header__link">
                        Login
                    </Link>
                    <Link to="/register" className="header__link">
                        Sign Up
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;
