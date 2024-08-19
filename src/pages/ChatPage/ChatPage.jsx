import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AIChat from "../../components/AIChat/AIChat";

const ChatPage = ({ isLoggedIn }) => {
    const token = sessionStorage.getItem("authToken");
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn && !token) {
            navigate("/login");
        }
    }, [isLoggedIn, token]);

    return isLoggedIn ? (
        <>
            <AIChat token={token} />
        </>
    ) : (
        <>
            <p>You must be logged in to chat with gemini.</p>
        </>
    );
};

export default ChatPage;
