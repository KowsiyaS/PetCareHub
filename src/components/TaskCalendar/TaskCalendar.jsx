import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import AddTaskModal from "../AddTaskModal/AddTaskModal";
import EventList from "../EventList/EventList";
import "./TaskCalendar.scss";

const TaskCalendar = ({ token }) => {
    const [date, setDate] = useState(new Date());
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [scheduledDates, setScheduledDates] = useState({});
    const [reminders, setReminders] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [petList, setPetList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedDateEvents, setSelectedDateEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const navigate = useNavigate();
    const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

    const getScheduledDates = async () => {
        try {
            const reminderResponse = await axios.get(
                `${API_BASE_URL}/reminder`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const appointmentResponse = await axios.get(
                `${API_BASE_URL}/appointment`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setReminders(reminderResponse.data);
            setAppointments(appointmentResponse.data);

            const dates = reminderResponse.data
                .concat(appointmentResponse.data)
                .reduce((datesMap, item) => {
                    if (item.date) {
                        datesMap[item.date] = true;
                    }
                    return datesMap;
                }, {});
            setScheduledDates(dates);
        } catch (error) {
            console.error("Error retrieving scheduled dates:", error);
        }
    };

    const getPets = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/pet`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const tempList = response.data.map((pet) => ({
                value: pet.id,
                name: pet.name,
            }));
            setPetList(tempList);
            setIsLoaded(true);
        } catch (error) {
            console.error("Error retrieving pets:", error);
        }
    };

    useEffect(() => {
        getScheduledDates();
        getPets();
    }, []);

    useEffect(() => {
        getScheduledDates();
    }, [modalIsOpen]);

    useEffect(() => {
        const selectedDateString = date.toISOString().split("T")[0];
        const eventsForSelectedDate = [
            ...reminders.filter(
                (reminder) => reminder.date === selectedDateString
            ),
            ...appointments.filter(
                (appointment) => appointment.date === selectedDateString
            ),
        ];
        setSelectedDateEvents(eventsForSelectedDate);
    }, [date, reminders, appointments]);

    const tileClassName = ({ date }) => {
        const dateString = date.toISOString().split("T")[0];
        return scheduledDates[dateString] ? "task-calendar__has-event" : null;
    };

    const tileContent = ({ date }) => {
        const dateString = date.toISOString().split("T")[0];
        return scheduledDates[dateString] ? (
            <div className="task-calendar__event-dot" />
        ) : null;
    };

    const handleAddTask = () => {
        setModalIsOpen(true);
        setSelectedEvent(null);
    };

    const handleRequestClose = () => {
        setModalIsOpen(false);
        setSelectedEvent(null);
    };

    const handleEventClick = (event) => {
        if (event.vet_id) {
            setSelectedEvent(event);
            navigate("/edit-appointment", { state: event });
        } else {
            setSelectedEvent(event);
            setModalIsOpen(true);
        }
    };

    return isLoaded ? (
        <div className="task-calendar__container">
            <Calendar
                onChange={setDate}
                value={date}
                tileClassName={tileClassName}
                tileContent={tileContent}
                className="task-calendar__calendar"
            />
            {petList.length !== 0 ? (
                <div className="task-calendar__event-container">
                    <button
                        onClick={handleAddTask}
                        className="task-calendar__button"
                    >
                        Add Task
                    </button>
                    <AddTaskModal
                        isOpen={modalIsOpen}
                        onRequestClose={handleRequestClose}
                        petList={petList}
                        token={token}
                        event={selectedEvent}
                    />
                    <EventList
                        events={selectedDateEvents}
                        selectedDate={date}
                        onEventClick={handleEventClick}
                    />
                </div>
            ) : (
                <p className="task-calendar__message">
                    Please add a pet to use the calendar.
                </p>
            )}
        </div>
    ) : (
        <p className="task-calendar__loading">Loading...</p>
    );
};

export default TaskCalendar;
