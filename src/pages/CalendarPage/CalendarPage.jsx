import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TaskCalendar from "../../components/TaskCalendar/TaskCalendar";
import "./CalendarPage.scss";
const CalendarPage = ({ isLoggedIn }) => {
    const token = sessionStorage.getItem("authToken");
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn && !token) {
            navigate("/login");
        }
    }, [isLoggedIn, token]);

    return isLoggedIn ? (
        <div className="calendar">
            <h1 className="calendar__title">Calendar</h1>
            <TaskCalendar token={token} />
        </div>
    ) : (
        <>
            <p>You must be logged in to view the dashboard.</p>
        </>
    );
};

export default CalendarPage;
