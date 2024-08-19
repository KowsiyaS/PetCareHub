import { useState, useEffect } from "react";
import axios from "axios";
import AddPetModal from "../AddPetModal/AddPetModal";
import "./UserProfile.scss";

const UserProfile = ({ token }) => {
    const [userDetails, setUserDetails] = useState({});
    const [pets, setPets] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

    const getUserDetails = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUserDetails(response.data);
        } catch (error) {
            console.error("Error retrieving user details:", error);
        }
    };

    const getPets = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/pet`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setPets(response.data);
        } catch (error) {
            console.error("Error retrieving pets:", error);
        }
    };

    useEffect(() => {
        getUserDetails();
        getPets();
    }, [token]);

    const refreshPets = () => {
        getPets();
    };

    const handleAddPetClick = () => {
        setEditPet(null);
        setIsModalOpen(true);
    };

    const handleViewClick = (pet) => {
        console.log(pet);
    };

    return (
        <div className="user-profile">
            <h1 className="user-profile__title">User Profile</h1>
            <div className="user-profile__details">
                <h2 className="user-profile__name">Name: {userDetails.name}</h2>
                <p className="user-profile__email">
                    Email: {userDetails.email}
                </p>
            </div>
            <div className="user-profile__pets">
                <h2 className="user-profile__pets-title">My Pets</h2>
                <ul className="user-profile__pets-list">
                    {pets.map((pet) => (
                        <li key={pet.id} className="user-profile__pets-item">
                            {pet.name}
                            <button
                                className="user-profile__view-button"
                                onClick={() => handleViewClick(pet)}
                            >
                                View
                            </button>
                        </li>
                    ))}
                </ul>
                <button
                    className="user-profile__add-button"
                    onClick={handleAddPetClick}
                >
                    Add Pet
                </button>
            </div>
            <AddPetModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                token={token}
                refreshPets={refreshPets}
            />
        </div>
    );
};

export default UserProfile;
