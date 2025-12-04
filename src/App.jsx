import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ChangePassword from "./pages/ChangePassword";
import AnnkutSevakList from "./pages/AnnkutSevakList";
import MandalSevakList from "./pages/MandalSevakList";
import ReceiptBooks from "./pages/ReceiptBooks";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/annkut-sevak-list" element={<AnnkutSevakList />} />
          <Route path="/receipt-books" element={<ReceiptBooks />} />
          <Route path="/mandal-sevak-list" element={<MandalSevakList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;