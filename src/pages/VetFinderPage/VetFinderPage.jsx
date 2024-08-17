import { useNavigate } from "react-router-dom";
import VetMap from "../../components/VetMap/VetMap";

const VetFinderPage = () => {
    const token = sessionStorage.getItem("authToken");
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn && !token) {
            navigate("/login");
        }
    }, [isLoggedIn, token]);

    return isLoggedIn ? (
        <>
            <VetMap token={token} />
        </>
    ) : (
        <>
            <p> Must be logged in to view the map.</p>
        </>
    );
};

export default VetFinderPage;
