import { useEffect, useState } from "react";
import Modal from "react-modal";
import "./AddTaskModal.scss";
import axios from "axios";

Modal.setAppElement("#root");

const TaskModal = ({ isOpen, onRequestClose }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [selectedPet, setSelectedPet] = useState(null);
    const [petList, setPetList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

    const getPets = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/pet`);
            console.log(response.data);
            const tempList = response.data.map((pet) => ({
                value: pet.id,
                name: pet.name,
            }));
            setPetList(tempList);
            setSelectedPet(tempList[0]);
            setIsLoaded(true);
        } catch (error) {
            console.error("Error fetching pets:", error);
        }
    };

    useEffect(() => {
        getPets();
    }, []);

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
            await axios.post(`${API_BASE_URL}/reminder`, reminder);
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

    return isLoaded ? (
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
    ) : (
        <div>Loading...</div>
    );
};

export default TaskModal;
