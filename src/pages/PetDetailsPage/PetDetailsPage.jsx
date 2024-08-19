import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PetDetails from "../../components/PetDetails/PetDetails";

const PetDetailsPage = ({ isLoggedIn }) => {
    const token = sessionStorage.getItem("authToken");
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn && !token) {
            navigate("/login");
        }
    }, [isLoggedIn, token]);

    return isLoggedIn ? (
        <>
            <PetDetails token={token} />
        </>
    ) : (
        <>
            <p>You must be logged in to view pet details.</p>
        </>
    );
};

export default PetDetailsPage;
