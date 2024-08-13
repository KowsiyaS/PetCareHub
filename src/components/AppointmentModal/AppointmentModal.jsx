import Modal from "react-modal";
import "./AppointmentModal.scss";

Modal.setAppElement("#root");

const AppointmentModal = ({ isOpen, onRequestClose, selectedPlace }) => {
    const handleBookAppointment = () => {
        console.log("Booking appointment for:", selectedPlace.name);
        onRequestClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Book Appointment"
            className="booking-modal"
            overlayClassName="booking-modal__overlay"
        >
            <button
                className="booking-modal__close-btn"
                onClick={onRequestClose}
            >
                ×
            </button>
            <h2 className="booking-modal__header">Book an Appointment</h2>
            {selectedPlace && (
                <div>
                    <h3>{selectedPlace.name}</h3>
                    <p>{selectedPlace.formatted_address}</p>
                    <p>Rating: {selectedPlace.rating}</p>
                    <p>Phone: {selectedPlace.formatted_phone_number}</p>
                    <button onClick={handleBookAppointment}>
                        Book Appointment
                    </button>
                </div>
            )}
            <button onClick={onRequestClose}>Close</button>
        </Modal>
    );
};

export default AppointmentModal;
