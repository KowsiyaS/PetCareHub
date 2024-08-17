import "./HomePage.scss";
import petImage from "../../assets/images/pets.jpg";
const HomePage = () => {
    return (
        <div className="home">
            <div className="home__header">
                <h1 className="home__title">Welcome to PetCare Hub</h1>
                <p className="home__subtitle">
                    Your all-in-one solution for managing your pet’s care.
                </p>
            </div>
            <div>
                <img
                    src={petImage}
                    alt="Image of pets from http://www.freepik.com Designed by Freepik."
                />
            </div>
            <main className="home__main">
                <section className="home__info">
                    <h2>Features</h2>
                    <ul>
                        <li>Find nearby veterinarians</li>
                        <li>Schedule appointments</li>
                        <li>Store important medical history</li>
                    </ul>
                </section>
                <section className="home__auth">
                    <button className="home__button home__button--login">
                        Login
                    </button>
                    <button className="home__button home__button--signup">
                        Sign Up
                    </button>
                </section>
            </main>
        </div>
    );
};

export default HomePage;
