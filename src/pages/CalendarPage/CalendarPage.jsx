import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TaskCalendar from "../../components/TaskCalendar/TaskCalendar";

const CalendarPage = ({ isLoggedIn }) => {
    const token = sessionStorage.getItem("authToken");
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn && !token) {
            navigate("/login");
        }
    }, [isLoggedIn, token]);

    return isLoggedIn ? (
        <>
            <TaskCalendar token={token} />
        </>
    ) : (
        <>
            <p>You must be logged in to view the dashboard.</p>
        </>
    );
};

export default CalendarPage;
