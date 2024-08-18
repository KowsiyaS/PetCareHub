import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.scss";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

    const handleUsername = (e) => {
        setUsername(e.target.value);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !email || !password || !confirmPassword) {
            setMessage("Please enter required feilds.");
        }

        if (password === confirmPassword) {
            try {
                await axios.post(`${API_BASE_URL}/user/register`, {
                    name: username,
                    email: email,
                    password: password,
                });
                setMessage("Successfully registered.");
                navigate("/login");
            } catch (error) {
                setMessage("unable to register user.");
            }
        } else {
            setMessage("Passwords do not match.");
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUsername}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmail}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePassword}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                        type="password"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={handleConfirmPassword}
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default SignUp;
