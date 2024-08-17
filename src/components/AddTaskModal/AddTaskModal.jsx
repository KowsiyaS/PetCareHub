import { useEffect, useState } from "react";
import Modal from "react-modal";
import "./AddTaskModal.scss";
import axios from "axios";

Modal.setAppElement("#root");

const TaskModal = ({ isOpen, onRequestClose, petList, token }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [selectedPet, setSelectedPet] = useState(petList[0]);
    const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const reminder = {
                pet_id: selectedPet.value,
                name: name,
                description: description,
                date: date,
                time: time,
            };
            await axios.post(`${API_BASE_URL}/reminder`, reminder, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(reminder);
            setDescription("");
            setName("");
            setDate("");
            setTime("");
            onRequestClose();
        } catch (error) {
            console.error("Cannot add a task.");
        }
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
                <div>
                    <label htmlFor="pet-select">Select a pet:</label>
                    <select
                        id="pet-select"
                        value={selectedPet}
                        onChange={(e) => setSelectedPet(e.target.value)}
                    >
                        <option disabled>Select a Pet</option>
                        {petList.map((pet) => (
                            <option key={pet.value} value={pet.value}>
                                {pet.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="name">Task Name</label>
                    <input
                        type="text"
                        value={name}
                        id="name"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Task Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="date">Select Date:</label>
                    <input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="time">Select Time</label>
                    <input
                        id="time"
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">Add Task</button>
                    <button type="button" onClick={onRequestClose}>
                        Cancel
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default TaskModal;
