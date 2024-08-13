// API_KEY = AIzaSyDXDfa0MHAV3Z4FBqhInV4JG7qAlvNYSaY

import { useState, useEffect } from "react";
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";
import AppointmentModal from "../AppointmentModal/AppointmentModal";

const libraries = ["places"];
const mapContainerStyle = {
    height: "100vh",
    width: "100%",
};
const center = {
    lat: 43.6545,
    lng: -79.347015,
};

const vetList = [
    "ChIJX61xwjXL1IkRDNYMpctRgno",
    "ChIJ7To8vNs0K4gRNvvJLbs-Xf8",
    "ChIJy29rIuM0K4gR9_uGfbxB1K4",
    "ChIJMXwmY980K4gRWWFZTS63ynI",
    "ChIJee_0oWcsO4gRjc4OqqQzNus",
    "ChIJVfzHpu40K4gR9iQFBtX5MhE",
    "ChIJh7QjEJM0K4gR9mswqoulqu0",
    "ChIJ90WFJ6k0K4gRAqYVLFQAVNE",
    "ChIJizIwGaQ0K4gRk0GCR1ebt_A",
    "ChIJeWcZoLI0K4gRxCm0VYzjizY",
];

const VetMap = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyDXDfa0MHAV3Z4FBqhInV4JG7qAlvNYSaY",
        libraries,
    });

    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (map) {
            const service = new window.google.maps.places.PlacesService(map);
            const request = {
                location: center,
                radius: "10000",
                type: ["veterinary_care"],
            };

            service.nearbySearch(request, (results, status) => {
                if (
                    status === window.google.maps.places.PlacesServiceStatus.OK
                ) {
                    const filteredList = results.filter((place) =>
                        vetList.includes(place.place_id)
                    );
                    setMarkers(filteredList);
                }
            });
        }
    }, [map]);

    const handleMarkerClick = (place) => {
        const service = new window.google.maps.places.PlacesService(map);
        service.getDetails({ placeId: place.place_id }, (result, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                setSelectedPlace(result);
            }
        });
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPlace(null);
    };

    return isLoaded ? (
        <>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={14}
                center={center}
                onLoad={(map) => setMap(map)}
            >
                {markers.map((marker, index) => (
                    <Marker
                        key={index}
                        position={{
                            lat: marker.geometry.location.lat(),
                            lng: marker.geometry.location.lng(),
                        }}
                        title={marker.name}
                        onClick={() => handleMarkerClick(marker)}
                    />
                ))}

                {selectedPlace && (
                    <InfoWindow
                        position={{
                            lat: selectedPlace.geometry.location.lat(),
                            lng: selectedPlace.geometry.location.lng(),
                        }}
                    >
                        <div>
                            <h2>{selectedPlace.name}</h2>
                            <p>{selectedPlace.place_id}</p>
                            <p>{selectedPlace.formatted_address}</p>
                            <p>Rating: {selectedPlace.rating}</p>
                            <p>Phone: {selectedPlace.formatted_phone_number}</p>
                            {/* <button
                            onClick={() => handleMarkerClick(selectedPlace)}
                            >
                                Book Appointment
                            </button> */}
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
            <AppointmentModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                selectedPlace={selectedPlace}
            />
        </>
    ) : (
        <div>Loading...</div>
    );
};

export default VetMap;
