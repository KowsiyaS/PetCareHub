import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./PetDetails.scss";

const PetDetails = ({ token }) => {
    const location = useLocation();
    const [medicalRecords, setMedicalRecords] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [pet, setPet] = useState(null);
    const navigate = useNavigate();
    const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

    const getPetRecords = async (id) => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/medical-record/pet/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setMedicalRecords(response.data);
            setIsLoaded(true);
        } catch (error) {
            console.error("Error retrieving pets:", error);
        }
    };

    useEffect(() => {
        const pet = location.state.pet;
        setPet(pet);
        getPetRecords(pet.id);
    }, []);

    const handleAddRecord = () => {
        navigate("/upload-record");
    };

    const handleViewRecord = (record) => {
        navigate("/upload-record", { state: { record } });
    };

    return (
        isLoaded && (
            <div className="pet-details">
                <h1 className="pet-details__title">{pet.name}'s Details</h1>
                <p className="pet-details__info">
                    Birth Date: {pet.birth_date}
                </p>
                <p className="pet-details__info">Species: {pet.species}</p>

                <h2 className="pet-details__section-title">Medical Records</h2>
                {medicalRecords.length > 0 ? (
                    <ul className="pet-details__records-list">
                        {medicalRecords.map((record, index) => (
                            <li
                                key={index}
                                className="pet-details__records-list__item"
                            >
                                <div>
                                    <p className="pet-details__records-list__item__name">
                                        {record.name}
                                    </p>
                                    <p className="pet-details__records-list__item__description">
                                        {record.description}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleViewRecord(record)}
                                    className="pet-details__records-list__item__button"
                                >
                                    View Record
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="pet-details__no-records">
                        No medical records.
                    </div>
                )}
                <button
                    onClick={handleAddRecord}
                    className="pet-details__add-record-button"
                >
                    Upload Record
                </button>
            </div>
        )
    );
};

export default PetDetails;
