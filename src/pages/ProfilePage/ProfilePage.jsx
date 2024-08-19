import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserProfile from "../../components/UserProfile/UserProfile";

const UserProfilePage = ({ isLoggedIn }) => {
    const token = sessionStorage.getItem("authToken");
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn && !token) {
            navigate("/login");
        }
    }, [isLoggedIn, token]);

    return isLoggedIn ? (
        <>
            <UserProfile token={token} />
        </>
    ) : (
        <>
            <p>You must be logged in to view your profile.</p>
        </>
    );
};

export default UserProfilePage;
