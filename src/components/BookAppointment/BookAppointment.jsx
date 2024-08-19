import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./BookAppointment.scss";

const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const convertTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(":");

    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    let hour = date.getHours();
    const period = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    const formattedTime = `${hour.toString()}:${minutes} ${period}`;

    return formattedTime;
};

const BookAppointment = ({ token }) => {
    const location = useLocation();
    const [vet, setVet] = useState(null);
    const [appointmentId, setAppointmentId] = useState(0);
    const [date, setDate] = useState("");
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedTime, setSelectedTime] = useState("");
    const [appointmentDetails, setAppointmentDetails] = useState("");
    const [selectedPet, setSelectedPet] = useState(null);
    const [petList, setPetList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isAddMode, setIsAddMode] = useState(true);
    const navigate = useNavigate();

    const getVet = async (id) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/vets/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setVet(response.data);
        } catch (error) {
            console.error("Error retrieving vet.", error);
        }
    };

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
            setSelectedPet(tempList[0]);
            setIsLoaded(true);
        } catch (error) {
            console.error("Error retrieving pets:", error);
        }
    };

    useEffect(() => {
        getPets();
        if (location.state?.vet) {
            const { vetId, name, formatted_address, formatted_phone_number } =
                location.state.vet;
            setVet({
                id: vetId,
                name,
                address: formatted_address,
                phone_number: formatted_phone_number,
            });
            setIsEditMode(true);
        } else {
            const event = location.state;

            getVet(event.vet_id);
            setAppointmentId(event.id);
            setDate(event.date);
            setSelectedTime(event.time);
            setAppointmentDetails(event.description);
            setSelectedPet(petList.find((pet) => pet.value === event.pet_id));
            setIsEditMode(false);
            setIsAddMode(false);
        }
    }, []);

    useEffect(() => {
        if (date && vet) {
            const fetchAvailableSlots = async () => {
                try {
                    const response = await axios.get(
                        `${API_BASE_URL}/appointment/timeslots`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                            params: {
                                vet_id: vet.id,
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
    }, [date, vet]);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const appointment = {
            vet_id: vet.id,
            pet_id: selectedPet.value,
            description: appointmentDetails,
            date,
            time: selectedTime,
        };

        if (!isAddMode) {
            try {
                await axios.put(
                    `${API_BASE_URL}/appointment/${appointmentId}`,
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
                console.error("Error booking appointment", error);
            }
        } else {
            console.log();
            try {
                await axios.post(`${API_BASE_URL}/appointment`, appointment, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                alert("Appointment booked successfully!");
                navigate("/dashboard");
            } catch (error) {
                console.error("Error booking appointment", error);
            }
        }
    };

    const handleDelete = async () => {
        if (!appointmentId) return;

        try {
            await axios.delete(`${API_BASE_URL}/appointment/${appointmentId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate("/dashboard");
        } catch (error) {
            console.error("Cannot delete appointment:", error);
        }
    };

    if (!isLoaded) {
        return <div className="book-appointment__loading">Loading...</div>;
    }

    return (
        <div className="book-appointment">
            <h1>Book an Appointment</h1>
            <div className="book-appointment__header">
                <p>Clinic: {vet?.name}</p>
                <p>Address: {vet?.address}</p>
                <p>Phone: {vet?.phone_number}</p>
            </div>

            {isEditMode ? (
                <form
                    className="book-appointment__form"
                    onSubmit={handleFormSubmit}
                >
                    <div className="book-appointment__form__group">
                        <label
                            className="book-appointment__form__label"
                            htmlFor="pet-select"
                        >
                            Select a pet:
                        </label>
                        <select
                            className="book-appointment__form__select"
                            id="pet-select"
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
                    <div className="book-appointment__form__group">
                        <label
                            className="book-appointment__form__label"
                            htmlFor="date"
                        >
                            Select Date:
                        </label>
                        <input
                            className="book-appointment__form__input"
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>

                    {timeSlots.length > 0 && (
                        <div className="book-appointment__form__group">
                            <label
                                className="book-appointment__form__label"
                                htmlFor="time"
                            >
                                Select Time Slot:
                            </label>
                            <select
                                className="book-appointment__form__select"
                                id="time"
                                value={selectedTime}
                                onChange={(e) =>
                                    setSelectedTime(e.target.value)
                                }
                                required
                            >
                                <option value="" disabled>
                                    Select a time slot
                                </option>
                                {timeSlots.map((slot, index) => (
                                    <option key={index} value={slot}>
                                        {convertTime(slot)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    <div className="book-appointment__form__group">
                        <label
                            className="book-appointment__form__label"
                            htmlFor="appointment"
                        >
                            Appointment Details:
                        </label>
                        <textarea
                            className="book-appointment__form__textarea"
                            id="appointment"
                            value={appointmentDetails}
                            onChange={(e) =>
                                setAppointmentDetails(e.target.value)
                            }
                            required
                        ></textarea>
                    </div>
                    <button
                        className="book-appointment__form__button"
                        type="submit"
                    >
                        {!isAddMode ? "Update Appointment" : "Book Appointment"}
                    </button>
                </form>
            ) : (
                <div className="book-appointment__edit-mode">
                    <p>Date: {date}</p>
                    <p>Time: {convertTime(selectedTime)}</p>
                    <p>Description: {appointmentDetails}</p>
                    <button
                        className="book-appointment__form__button book-appointment__form__button--edit"
                        onClick={() => setIsEditMode(true)}
                    >
                        Edit Appointment
                    </button>
                    <button
                        className="book-appointment__form__button book-appointment__form__button--delete"
                        onClick={handleDelete}
                    >
                        Delete Appointment
                    </button>
                </div>
            )}
        </div>
    );
};

export default BookAppointment;
