import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookAppointment from "../../components/BookAppointment/BookAppointment";

const BookAppointmentPage = ({ isLoggedIn }) => {
    const token = sessionStorage.getItem("authToken");
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn && !token) {
            navigate("/login");
        }
    }, [isLoggedIn, token]);

    return isLoggedIn ? (
        <>
            <BookAppointment token={token} />
        </>
    ) : (
        <>
            <p>You must be logged in to book an appointment.</p>
        </>
    );
};

export default BookAppointmentPage;
