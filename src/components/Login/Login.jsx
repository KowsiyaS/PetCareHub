import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.scss";

const Login = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`${API_BASE_URL}/user/login`, {
                email: username,
                password,
            });

            const token = response.data.token;

            sessionStorage.setItem("authToken", token);

            setIsLoggedIn(true);
            setMessage("Successfully logged in.");
            navigate("/dashboard");
        } catch (error) {
            console.error("Login error:", error);
            setMessage("Invalid credentials, please try again.");
        }
    };

    return (
        <div className="login__container">
            <h1 className="login__title">Login</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="username" className="login__label">
                    Email:
                </label>
                <input
                    type="text"
                    id="username"
                    className="login__input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <label htmlFor="password" className="login__label">
                    Password:
                </label>
                <input
                    type="password"
                    id="password"
                    className="login__input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" className="login__button">
                    Login
                </button>
            </form>
            <p className="login__message">{message}</p>
        </div>
    );
};

export default Login;
