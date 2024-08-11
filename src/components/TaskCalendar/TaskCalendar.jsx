import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import AddTaskModal from "../AddTaskModal/AddTaskModal";
import "./TaskCalendar.scss";

const TaskCalendar = () => {
    const [date, setDate] = useState(new Date());
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [tasks, setTasks] = useState([
        { date: new Date(2024, 7, 15), type: "reminder" },
        { date: new Date(2024, 7, 15), type: "appointment" },
    ]);

    const handleDateChange = (newDate) => {
        setDate(newDate);
    };

    const addTask = (date, type) => {
        setTasks([...tasks, { date, type }]);
    };

    const getDots = (date) => {
        return tasks
            .filter((task) => task.date.toDateString() === date.toDateString())
            .map((task) => (
                <div key={task.type} className={`${task.type}-dot`} />
            ));
    };

    return (
        <div>
            <Calendar
                onChange={handleDateChange}
                value={date}
                tileContent={({ date }) => (
                    <div className="dot-container">{getDots(date)}</div>
                )}
            />
            <button onClick={() => setModalIsOpen(true)}>Add Task</button>
            <AddTaskModal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                addTask={addTask}
            />
        </div>
    );
};

export default TaskCalendar;
