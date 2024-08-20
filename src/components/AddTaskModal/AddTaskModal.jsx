import { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import "./AddTaskModal.scss";

Modal.setAppElement("#root");

const AddTaskModal = ({ isOpen, onRequestClose, petList, token, event }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [selectedPet, setSelectedPet] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

    useEffect(() => {
        console.log(petList);
        if (event) {
            setName(event.name);
            setDescription(event.description);
            setDate(event.date);
            setTime(event.time);
            setSelectedPet(petList.find((pet) => pet.value === event.pet_id));
        } else {
            setName("");
            setDescription("");
            setDate("");
            setTime("");
        }
    }, [event, petList]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const taskData = {
                pet_id: selectedPet.value,
                name,
                description,
                date,
                time,
            };

            if (event) {
                await axios.put(
                    `${API_BASE_URL}/reminder/${event.id}`,
                    taskData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log("Task updated:", taskData);
            } else {
                await axios.post(`${API_BASE_URL}/reminder`, taskData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("Task added:", taskData);
            }

            setName("");
            setDescription("");
            setDate("");
            setTime("");
            setIsEditing(false);
            onRequestClose();
        } catch (error) {
            console.error("Cannot add/update task:", error);
        }
    };

    const handleDelete = async () => {
        if (!event) return;

        try {
            await axios.delete(`${API_BASE_URL}/reminder/${event.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            onRequestClose();
        } catch (error) {
            console.error("Cannot delete task:", error);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel={event ? "Edit Task" : "Add Task"}
            className="add-task-modal"
            overlayClassName="add-task-modal__overlay"
        >
            <div className="add-task-modal__header">
                <h3 className="add-task-modal__title">
                    {event
                        ? isEditing
                            ? "Edit Task"
                            : "View Task"
                        : "Add Task"}
                </h3>
                <button
                    type="button"
                    onClick={onRequestClose}
                    className="add-task-modal__close"
                >
                    &times;
                </button>
            </div>
            {isEditing || !event ? (
                <form onSubmit={handleSubmit} className="add-task-modal__form">
                    <div className="add-task-modal__field">
                        <label
                            htmlFor="pet-select"
                            className="add-task-modal__label"
                        >
                            Select a pet:
                        </label>
                        <select
                            id="pet-select"
                            className="add-task-modal__select"
                            value={selectedPet?.value || ""}
                            onChange={(e) =>
                                setSelectedPet(
                                    petList.find(
                                        (pet) => pet.value == e.target.value
                                    )
                                )
                            }
                            required
                        >
                            <option disabled value="">
                                Select a Pet
                            </option>
                            {petList.map((pet) => (
                                <option key={pet.value} value={pet.value}>
                                    {pet.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="add-task-modal__field">
                        <label htmlFor="name" className="add-task-modal__label">
                            Task Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="add-task-modal__input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="add-task-modal__field">
                        <label
                            htmlFor="description"
                            className="add-task-modal__label"
                        >
                            Task Description
                        </label>
                        <textarea
                            id="description"
                            className="add-task-modal__textarea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="add-task-modal__field">
                        <label htmlFor="date" className="add-task-modal__label">
                            Select Date:
                        </label>
                        <input
                            id="date"
                            type="date"
                            className="add-task-modal__input"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="add-task-modal__field">
                        <label htmlFor="time" className="add-task-modal__label">
                            Select Time
                        </label>
                        <input
                            id="time"
                            type="time"
                            className="add-task-modal__input"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </div>
                    <div className="add-task-modal__buttons">
                        <button
                            type="submit"
                            className="add-task-modal__button"
                        >
                            {event ? "Update Task" : "Add Task"}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                if (event) setIsEditing(false);
                                onRequestClose();
                            }}
                            className="add-task-modal__button add-task-modal__button--cancel"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <div className="add-task-modal__view">
                    <p>
                        <strong>Task Name:</strong> {name}
                    </p>
                    <p>
                        <strong>Description:</strong> {description}
                    </p>
                    <p>
                        <strong>Date:</strong> {date}
                    </p>
                    <p>
                        <strong>Time:</strong> {time}
                    </p>
                    <p>
                        <strong>Pet:</strong> {selectedPet?.name}
                    </p>
                    <div className="add-task-modal__buttons">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="add-task-modal__button add-task-modal__button"
                        >
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="add-task-modal__button add-task-modal__button--delete"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default AddTaskModal;
