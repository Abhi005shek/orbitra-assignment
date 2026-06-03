import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import "./App.css";
import Login from "./components/login";
import Register from "./components/register";
import PublicRoute from "./components/public-route";
import DashboardLayout from "./components/dashboard-layout";
import UploadDocument from "./components/upload-document";
import Itinerary from "./components/itineraries";
import ItineraryById from "./components/get-itinerary-by-id";
import SharedItineraryById from "./components/shared-itinerary";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="/share/:id" element={<SharedItineraryById />} />

        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Navigate to={"/upload"} replace />} />
          <Route path="/upload" element={<UploadDocument />} />
          <Route path="/itineraries" element={<Itinerary />} />
          <Route path="/itineraries/:id" element={<ItineraryById />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
