import "./EventList.scss";

const EventList = ({ events, selectedDate }) => {
    return (
        <div className="event-list__container">
            <h2 className="event-list__title">
                Events on {selectedDate.toDateString()}:
            </h2>
            <ul className="event-list__list">
                {events.length > 0 ? (
                    events.map((event, index) => (
                        <li
                            key={index}
                            className={`event-list__item ${
                                !event.vet_id
                                    ? "event-list__item--reminder"
                                    : "event-list__item--appointment"
                            }`}
                        >
                            {!event.vet_id ? "Reminder: " : "Appointment: "}
                            {event.description || "No description"}
                        </li>
                    ))
                ) : (
                    <li className="event-list__item">
                        No events for this date
                    </li>
                )}
            </ul>
        </div>
    );
};

export default EventList;
