import { useState } from "react";
import axios from "axios";
import "./AIChat.scss";
const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

function AIChat({ token }) {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");

    const sendMessage = async () => {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/chat`,
                { prompt },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setResponse(response.data);
        } catch (error) {
            console.error("Error:", error);
            setResponse("An error occurred.");
        }
    };

    const clearChat = () => {
        setPrompt("");
        setResponse("");
    };

    return (
        <div className="chat">
            <p className="chat__disclaimer">
                This is not medical advice. For any health concerns regarding
                your pet, please consult a licensed veterinarian.
            </p>
            <h1 className="chat__header">Chat with the Veterinary Expert</h1>
            <div className="chat__input-container">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="chat__input"
                    placeholder="Ask about veterinary topics"
                />
                <button className="chat__button" onClick={sendMessage}>
                    Send
                </button>
            </div>
            {response && (
                <div>
                    <div className="chat__response">
                        <h3>Response:</h3>
                        <p>{response}</p>
                    </div>
                    <button className="chat__button" onClick={clearChat}>
                        Clear
                    </button>
                </div>
            )}
        </div>
    );
}

export default AIChat;
