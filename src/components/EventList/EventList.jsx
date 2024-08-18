import "./EventList.scss";

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

const EventList = ({ events, selectedDate, onEventClick }) => {
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
                            onClick={() => onEventClick(event)}
                        >
                            <p>
                                <strong>
                                    {event.time
                                        ? convertTime(event.time) + ": "
                                        : ""}
                                </strong>
                            </p>
                            <p>
                                {!event.vet_id ? event.name : event.description}
                            </p>
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
