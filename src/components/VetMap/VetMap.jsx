// API_KEY = AIzaSyDXDfa0MHAV3Z4FBqhInV4JG7qAlvNYSaY

// src/components/MapContainer.js

import { useState, useEffect, useRef } from "react";
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
    height: "100vh",
    width: "100%",
};
const center = {
    lat: 43.65107,
    lng: -79.347015,
};

const VetMap = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyDXDfa0MHAV3Z4FBqhInV4JG7qAlvNYSaY",
        libraries,
    });

    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState(null);

    const mapRef = useRef(null);

    useEffect(() => {
        if (map) {
            const service = new window.google.maps.places.PlacesService(map);
            const request = {
                location: center,
                radius: "5000",
                type: ["veterinary_care"],
            };

            service.nearbySearch(request, (results, status) => {
                if (
                    status === window.google.maps.places.PlacesServiceStatus.OK
                ) {
                    setMarkers(results);
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

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={12}
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
                    onCloseClick={() => setSelectedPlace(null)}
                >
                    <div>
                        <h2>{selectedPlace.name}</h2>
                        <p>{selectedPlace.formatted_address}</p>
                        <p>Rating: {selectedPlace.rating}</p>
                        <p>Phone: {selectedPlace.formatted_phone_number}</p>
                        {selectedPlace.website && (
                            <a href={selectedPlace.website} target="_blank">
                                Website
                            </a>
                        )}
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    ) : (
        <div>Loading...</div>
    );
};

export default VetMap;
