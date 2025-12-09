import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ChangePassword from "./pages/ChangePassword";
import AnnkutSevakList from "./pages/AnnkutSevakList";
import MandalSevakList from "./pages/MandalSevakList";
import ReceiptBooks from "./pages/ReceiptBooks";
import AdminHome from "./pages/AdminHome";
import LeaderHome from "./pages/SupervisorHome";
import TeamHome from "./pages/TeamHome";
import SamparkVyaktiDetails from "./pages/SamparkVyaktiDetails";
import AdminManageTeams from "./pages/ManageTeams";
import SupervisorHome from "./pages/SupervisorHome";
import ManageTeams from "./pages/ManageTeams";
import ManageSamparSevakkDetails from "./pages/ManageSamparSevakkDetails";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin-home" element={<AdminHome />} />
          <Route path="/supervisor-home" element={<SupervisorHome />} />
          <Route path="/team-home" element={<TeamHome />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/annkut-sevak-list" element={<AnnkutSevakList />} />
          <Route path="/receipt-books" element={<ReceiptBooks />} />
          <Route path="/mandal-sevak-list" element={<MandalSevakList />} />
          <Route path="/sampark-vyakti-details" element={<SamparkVyaktiDetails />} />
          <Route path="/manage-sampark-sevak-details" element={<ManageSamparSevakkDetails />} />
          <Route path="/manage-teams" element={<ManageTeams />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;