import { useState } from "react";
import Modal from "react-modal";
import "./AddTaskModal.scss";

Modal.setAppElement("#root");

const TaskModal = ({ isOpen, onRequestClose, addTask }) => {
    const [date, setDate] = useState("");
    const [type, setType] = useState("reminder");

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask(new Date(date + "T00:00:00"), type);
        setDate("");
        setType("reminder");
        onRequestClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Add Task"
            className="modal"
            overlayClassName="overlay"
        >
            <h2>Add Task</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="reminder">Reminder</option>
                    <option value="appointment">Appointment</option>
                </select>
                <button type="submit">Add Task</button>
                <button type="button" onClick={onRequestClose}>
                    Cancel
                </button>
            </form>
        </Modal>
    );
};

export default TaskModal;
