import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import "./AddPetModal.scss";

Modal.setAppElement("#root");

const AddPetModal = ({ isOpen, onRequestClose, token, refreshPets }) => {
    const [name, setName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [species, setSpecies] = useState("");
    const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newPet = {
                name: name,
                birth_date: birthDate,
                species: species,
            };

            await axios.post(`${API_BASE_URL}/pet`, newPet, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            refreshPets();
            setName("");
            setBirthDate("");
            setBreed("");
            onRequestClose();
        } catch (error) {
            console.error("Error adding pet:", error);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel={"Add Pet"}
            className="add-pet-modal"
            overlayClassName="add-pet-modal__overlay"
        >
            <h2 className="add-pet-modal__title">Add Pet</h2>
            <form onSubmit={handleSubmit} className="add-pet-modal__form">
                <div className="add-pet-modal__field">
                    <label htmlFor="pet-name" className="add-pet-modal__label">
                        Name:
                    </label>
                    <input
                        type="text"
                        id="pet-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="add-pet-modal__input"
                        required
                    />
                </div>
                <div className="add-pet-modal__field">
                    <label
                        htmlFor="pet-birth-date"
                        className="add-pet-modal__label"
                    >
                        Birth Date:
                    </label>
                    <input
                        type="date"
                        id="pet-birth-date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        className="add-pet-modal__input"
                        required
                    />
                </div>
                <div className="add-pet-modal__field">
                    <label htmlFor="pet-breed" className="add-pet-modal__label">
                        Species:
                    </label>
                    <input
                        type="text"
                        id="pet-breed"
                        value={species}
                        onChange={(e) => setSpecies(e.target.value)}
                        className="add-pet-modal__input"
                        required
                    />
                </div>
                <div className="add-pet-modal__actions">
                    <button
                        type="submit"
                        className="add-pet-modal__button add-pet-modal__button--submit"
                    >
                        Add Pet
                    </button>
                    <button
                        type="button"
                        onClick={onRequestClose}
                        className="add-pet-modal__button add-pet-modal__button--cancel"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default AddPetModal;
