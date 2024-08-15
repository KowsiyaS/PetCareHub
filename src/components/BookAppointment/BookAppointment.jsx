import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const BookAppointment = () => {
    const location = useLocation();
    const { vetId, name, formatted_address, rating, formatted_phone_number } =
        location.state;

    const [date, setDate] = useState("");
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedTime, setSelectedTime] = useState("");
    const [appointmentDetails, setAppointmentDetails] = useState("");
    const [selectedPet, setSelectedPet] = useState(null);
    const [petList, setPetList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate("/");

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

    useEffect(() => {
        if (date) {
            const fetchAvailableSlots = async () => {
                try {
                    const response = await axios.get(
                        `${API_BASE_URL}/appointment/timeslots`,
                        {
                            params: { vet_id: vetId, date },
                        }
                    );
                    setTimeSlots(response.data);
                } catch (error) {
                    console.error("Error fetching available slots", error);
                }
            };

            fetchAvailableSlots();
        }
    }, [date]);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post(`${API_BASE_URL}/appointment`, {
                vet_id: vetId,
                pet_id: selectedPet.value,
                description: appointmentDetails,
                date,
                time: selectedTime,
            });
            alert("Appointment booked successfully!");
        } catch (error) {
            console.error("Error booking appointment", error);
        }
    };

    return isLoaded ? (
        <div>
            <h2>Book Appointment at {name}</h2>
            <p>{formatted_address}</p>
            <p>Phone: {formatted_phone_number}</p>
            <p>Rating: {rating}</p>

            <form onSubmit={handleFormSubmit}>
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
                    <label htmlFor="date">Select Date:</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>

                {timeSlots.length > 0 && (
                    <div>
                        <label htmlFor="time">Select Time Slot:</label>
                        <select
                            id="time"
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                            required
                        >
                            <option value="" disabled>
                                Select a time slot
                            </option>
                            {timeSlots.map((slot, index) => (
                                <option key={index} value={slot}>
                                    {slot}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                <div>
                    <label htmlFor="appointment">Appointment Details:</label>
                    <textarea
                        id="appointment"
                        value={appointmentDetails}
                        onChange={(e) => setAppointmentDetails(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit">Book Appointment</button>
            </form>
        </div>
    ) : (
        <div>Loading...</div>
    );
};

export default BookAppointment;
