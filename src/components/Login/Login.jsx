import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
        <div className="login-container">
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Email:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Login</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default Login;
