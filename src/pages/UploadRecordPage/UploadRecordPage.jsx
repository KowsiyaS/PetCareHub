import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UploadRecord from "../../components/UploadRecord/UploadRecord";

const UploadRecordPage = ({ isLoggedIn }) => {
    const token = sessionStorage.getItem("authToken");
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn && !token) {
            navigate("/login");
        }
    }, [isLoggedIn, token]);

    return isLoggedIn ? (
        <>
            <UploadRecord token={token} />
        </>
    ) : (
        <>
            <p>You must be logged in to upload a record.</p>
        </>
    );
};

export default UploadRecordPage;
