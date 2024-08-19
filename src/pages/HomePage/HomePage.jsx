import { useNavigate } from "react-router-dom";
import "./HomePage.scss";
import petImage from "../../assets/images/pets.jpg";

const HomePage = () => {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate("/login");
    };

    const handleSignUp = () => {
        navigate("/register");
    };

    return (
        <div className="home">
            <div className="home__header">
                <h1 className="home__title">Welcome to PetCare Hub</h1>
                <p className="home__subtitle">
                    Your all-in-one solution for managing your pet’s care.
                </p>
            </div>
            <div className="home__content">
                <div className="home__image-container">
                    <img
                        className="home__image"
                        src={petImage}
                        alt="Image of pets from http://www.freepik.com Designed by Freepik."
                    />
                </div>
                <main className="home__main">
                    <section className="home__info">
                        <h2 className="home__info-header">Features</h2>
                        <ul className="home__info-list">
                            <li>Find nearby veterinarians</li>
                            <li>Schedule appointments</li>
                            <li>Store important medical history</li>
                        </ul>
                    </section>
                    <section className="home__auth">
                        <button
                            className="home__button home__button--login"
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                        <button
                            className="home__button home__button--signup"
                            onClick={handleSignUp}
                        >
                            Sign Up
                        </button>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default HomePage;
