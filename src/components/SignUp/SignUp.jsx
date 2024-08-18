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
            setMessage("Please enter required fields.");
            return;
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
                setMessage("Unable to register user.");
            }
        } else {
            setMessage("Passwords do not match.");
        }
    };

    return (
        <div className="sign-up__container">
            <h1 className="sign-up__title">Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div className="sign-up__form-group">
                    <label htmlFor="username" className="sign-up__label">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="sign-up__input"
                        value={username}
                        onChange={handleUsername}
                        required
                    />
                </div>
                <div className="sign-up__form-group">
                    <label htmlFor="email" className="sign-up__label">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="sign-up__input"
                        value={email}
                        onChange={handleEmail}
                        required
                    />
                </div>
                <div className="sign-up__form-group">
                    <label htmlFor="password" className="sign-up__label">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="sign-up__input"
                        value={password}
                        onChange={handlePassword}
                        required
                    />
                </div>
                <div className="sign-up__form-group">
                    <label
                        htmlFor="confirm-password"
                        className="sign-up__label"
                    >
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirm-password"
                        className="sign-up__input"
                        value={confirmPassword}
                        onChange={handleConfirmPassword}
                        required
                    />
                </div>
                <button type="submit" className="sign-up__button">
                    Sign Up
                </button>
            </form>
            <p className="sign-up__message">{message}</p>
        </div>
    );
};

export default SignUp;
