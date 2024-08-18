import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const BookAppointment = ({ token, appointmentDetails }) => {
    const location = useLocation();
    const { vetId, name, formatted_address, rating, formatted_phone_number } =
        location.state || appointmentDetails;

    const [date, setDate] = useState(appointmentDetails?.date || "");
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedTime, setSelectedTime] = useState(
        appointmentDetails?.time || ""
    );
    const [description, setDescription] = useState(
        appointmentDetails?.description || ""
    );
    const [selectedPet, setSelectedPet] = useState(null);
    const [petList, setPetList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate("");

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
            setSelectedPet(
                tempList.find(
                    (pet) => pet.value === appointmentDetails?.pet_id
                ) || tempList[0]
            );
            setIsLoaded(true);
        } catch (error) {
            console.error("Error retrieving pets:", error);
        }
    };

    useEffect(() => {
        getPets();
    }, []);

    useEffect(() => {
        if (date) {
            const fetchAvailableSlots = async () => {
                try {
                    const response = await axios.get(
                        `${API_BASE_URL}/appointment/timeslots`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                            params: {
                                vet_id: vetId,
                                date: date,
                            },
                        }
                    );
                    setTimeSlots(response.data);
                } catch (error) {
                    console.error(
                        "Error retrieving available time slots for the vet.",
                        error
                    );
                }
            };

            fetchAvailableSlots();
        }
    }, [date]);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const appointment = {
                vet_id: vetId,
                pet_id: selectedPet.value,
                description,
                date,
                time: selectedTime,
            };
            await axios.put(
                `${API_BASE_URL}/appointment/${appointmentDetails.id}`,
                appointment,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Appointment updated successfully!");
            navigate("/dashboard");
        } catch (error) {
            console.error("Error updating appointment", error);
        }
    };

    if (!isLoaded) {
        return <>Loading</>;
    }

    return petList.length > 0 ? (
        <div>
            <h2>Book an appointment at {name}</h2>
            <p>Address: {formatted_address}</p>
            <p>Rating: {rating}</p>
            <p>Phone: {formatted_phone_number}</p>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor="pet">Pet:</label>
                    <select
                        id="pet"
                        value={selectedPet?.value || ""}
                        onChange={(e) =>
                            setSelectedPet(
                                petList.find(
                                    (pet) => pet.value === e.target.value
                                )
                            )
                        }
                    >
                        {petList.map((pet) => (
                            <option key={pet.value} value={pet.value}>
                                {pet.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                {timeSlots.length > 0 && (
                    <div>
                        <label htmlFor="time">Time Slot:</label>
                        <select
                            id="time"
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                        >
                            {timeSlots.map((slot, index) => (
                                <option key={index} value={slot}>
                                    {slot}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button type="submit">Update Appointment</button>
            </form>
        </div>
    ) : (
        <p>Please add a pet to book an appointment.</p>
    );
};

export default BookAppointment;
