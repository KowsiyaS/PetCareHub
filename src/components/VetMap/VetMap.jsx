import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";
import axios from "axios";
import "./VetMap.scss";

const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const GOOGLE_API_KEY = import.meta.env.VITE_APP_GOOGLE_API_KEY;

const libraries = ["places"];
const mapContainerStyle = {
    height: "100vh",
    width: "100%",
};

const center = {
    lat: 43.6635,
    lng: -79.3961,
};

const VetMap = ({ token }) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: GOOGLE_API_KEY,
        libraries,
    });

    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [selectedVet, setSelectedVet] = useState(null);
    const [vetList, setVetList] = useState([]);
    const [placeList, setPlaceList] = useState([]);
    const navigate = useNavigate();

    const getVets = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/vets`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const vets = [];
            for (const vet of response.data) {
                vets.push(vet.place_id);
            }
            setVetList(response.data);
            setPlaceList(vets);
        } catch (error) {
            console.error("Cannot get vet list", error);
        }
    };

    useEffect(() => {
        try {
            getVets();
        } catch (error) {
            console.error("Error retrieving vet list", error);
        }
    }, []);

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
                        placeList.includes(place.place_id)
                    );
                    setMarkers(filteredList);
                }
            });
        }
    }, [map, placeList]);

    const handleMarkerClick = (place) => {
        const service = new window.google.maps.places.PlacesService(map);
        service.getDetails({ placeId: place.place_id }, (result, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                setSelectedPlace(result);
                const vet = vetList.find(
                    (vet) => vet.place_id === result.place_id
                );
                setSelectedVet(vet);
            }
        });
    };

    const handleCloseClick = () => {
        setSelectedPlace(null);
        setSelectedVet(null);
    };

    const handleBookAppointment = (event) => {
        event.preventDefault();
        const { name, formatted_address, rating, formatted_phone_number } =
            selectedPlace;

        const vet = {
            vetId: selectedVet.id,
            name,
            formatted_address,
            rating,
            formatted_phone_number,
        };

        navigate("/book-appointment", {
            state: {
                vet,
            },
        });
    };

    return isLoaded ? (
        <div className="map-container">
            <h1>Find a Vet</h1>
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
                        onCloseClick={handleCloseClick}
                    >
                        <div>
                            <h2>{selectedPlace.name}</h2>
                            <p>{selectedPlace.formatted_address}</p>
                            <p>Rating: {selectedPlace.rating}</p>
                            <p>Phone: {selectedPlace.formatted_phone_number}</p>

                            <button
                                className="map-container__button"
                                onClick={handleBookAppointment}
                            >
                                Book Appointment
                            </button>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </div>
    ) : (
        <div>Loading...</div>
    );
};

export default VetMap;
