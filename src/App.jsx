import { BrowserRouter, Routes, Route } from "react-router-dom";
import CalendarPage from "./pages/CalendarPage/CalendarPage";
import VetFinderPage from "./pages/VetFinderPage/VetFinderPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CalendarPage />} />
                <Route path="/findvet" element={<VetFinderPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
