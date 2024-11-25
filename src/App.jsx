import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CalendarPage from "./pages/CalendarPage/CalendarPage";
import VetFinderPage from "./pages/VetFinderPage/VetFinderPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import BookAppointmentPage from "./pages/BookAppointmentPage/BookAppointmentPage";
import UploadRecordPage from "./pages/UploadRecordPage/UploadRecordPage";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import "./app.scss";
import UserProfilePage from "./pages/ProfilePage/ProfilePage";
import PetDetailsPage from "./pages/PetDetailsPage/PetDetailsPage";
import ChatPage from "./pages/ChatPage/ChatPage";

function App() {
    const hasToken = !!sessionStorage.getItem("authToken");
    const [isLoggedIn, setIsLoggedIn] = useState(hasToken);

    return (
        <BrowserRouter>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                    path="/login"
                    element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
                />
                <Route path="/register" element={<SignUpPage />} />
                <Route
                    path="/dashboard"
                    element={<CalendarPage isLoggedIn={isLoggedIn} />}
                />
                <Route
                    path="/findvet"
                    element={<VetFinderPage isLoggedIn={isLoggedIn} />}
                />
                <Route
                    path="/book-appointment"
                    element={<BookAppointmentPage isLoggedIn={isLoggedIn} />}
                />
                <Route
                    path="/edit-appointment"
                    element={<BookAppointmentPage isLoggedIn={isLoggedIn} />}
                />
                <Route
                    path="/upload-record"
                    element={<UploadRecordPage isLoggedIn={isLoggedIn} />}
                />
                <Route
                    path="/profile"
                    element={<UserProfilePage isLoggedIn={isLoggedIn} />}
                />
                <Route
                    path="/pet-details/:id"
                    element={<PetDetailsPage isLoggedIn={isLoggedIn} />}
                />
                <Route
                    path="/chat"
                    element={<ChatPage isLoggedIn={isLoggedIn} />}
                />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
