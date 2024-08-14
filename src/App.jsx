import { BrowserRouter, Routes, Route } from "react-router-dom";
import CalendarPage from "./pages/CalendarPage/CalendarPage";
import VetFinderPage from "./pages/VetFinderPage/VetFinderPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CalendarPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/findvet" element={<VetFinderPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
