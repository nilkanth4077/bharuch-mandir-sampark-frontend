import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import AddSupervisorModal from '../components/AddSupervisorModal';
import ListingTable from '../components/ListingTable';
import { FaEdit, FaTrash } from 'react-icons/fa';
import AddMemberModal from '../components/AddSamparkYuvakModal';
import { ProgressBar } from 'react-bootstrap';
import { Box, Chip, TextField } from '@mui/material';
import { samparkData } from '../api/data';
import AddSamparkYuvakModal from '../components/AddSamparkYuvakModal';
import axios from 'axios';
import { BACKEND_ENDPOINT } from '../api/api';

const TeamHome = () => {

  const navigate = useNavigate();
  const [showAddSupervisor, setShowAddSupervisor] = useState(false);
  const [qMandal, setQMandal] = useState("");
  const [ahevaals, setAhevaals] = useState([]);
  const [loading, setLoading] = useState(true);

  const sevakDetails = JSON.parse(localStorage.getItem("sevakDetails"));
  const password = localStorage.getItem("password") || "";

  const getMyAhevaals = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_ENDPOINT}/api/ahevaals/my`,
        {
          auth: {
            username: sevakDetails.userId,  // ADMIN001, NIRDESHAK001, etc.
            password: password
          }
        }
      );
      console.log("My Ahevaals:", response.data);
      setAhevaals(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching Ahevaals:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const filteredAhevaals = ahevaals.filter((item) =>
    item.name?.toLowerCase().includes(qMandal.toLowerCase()) ||
    item.phone?.toLowerCase().includes(qMandal.toLowerCase()) ||
    item.address?.toLowerCase().includes(qMandal.toLowerCase()) ||
    item.specialExp?.toLowerCase().includes(qMandal.toLowerCase())
  );

  useEffect(() => {
    getMyAhevaals();
  }, []);

  const handleAddSupervisor = () => setShowAddSupervisor(true);

  let sevak_target = 45;
  let achievedTarget = 2;
  const progress = sevak_target > 0 ? (achievedTarget / sevak_target) * 100 : 0;
  const progressClamped = Math.max(0, Math.min(100, Math.round(progress)));

  const showUpdateSupervisorModal = () => {
    alert("Update Supervisor clicked");
  }

  const showDeleteSupervisorModal = () => {
    alert("Delete Supervisor clicked");
  }

  return (
    <>
      <Header />

      {/* <div
        style={{
          display: "flex",
          textAlign: "left",
          fontFamily: "system-ui",
          justifyContent: "space-around",
        }}
      >
        <div style={{ width: "100%", padding: "10px", fontWeight: 600 }}>
          <h6 style={{ fontWeight: 600 }}>Achieved Target</h6>
          <ProgressBar
            now={progressClamped}
            label={`${progressClamped}%`}
            className="custom-progress-bar"
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          textAlign: "left",
          fontFamily: "system-ui",
          margin: "0 12px",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h6>Target : {sevak_target}</h6>
          <h6>Filled form : {achievedTarget}</h6>
        </div>
      </div> */}

      <Chip
        label={sevakDetails?.name || "Team Member"}
        sx={{
          fontSize: "1.2rem",
          padding: "16px 28px",
          height: "45px",
          margin: "20px 12px",
        }}
      />

      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '15px 12px',
        }}>
          <h5 style={{ margin: 0 }}>Sampark Details</h5>

          <Button color="warning" onClick={handleAddSupervisor}>
            Add Sampark Details
          </Button>
        </div>

        <Box mb={2} mx={1}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search here..."
            value={qMandal}
            onChange={(e) => setQMandal(e.target.value)}
          />
        </Box>

        <div style={{ overflowX: "auto", marginTop: "20px", marginInline: "12px" }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: "40px" }}>
              <div className="spinner-border text-primary" role="status"></div>
              <p style={{ marginTop: "10px" }}>Loading...</p>
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
              <thead>
                <tr style={{ backgroundColor: "#f2f2f2" }}>
                  <th style={{ border: "1px solid #ddd", padding: "10px" }}>Name</th>
                  <th style={{ border: "1px solid #ddd", padding: "10px" }}>Phone</th>
                  <th style={{ border: "1px solid #ddd", padding: "10px" }}>Address</th>
                  <th style={{ border: "1px solid #ddd", padding: "10px" }}>Special Exp</th>
                </tr>
              </thead>

              <tbody>
                {filteredAhevaals.map((item, index) => (
                  <tr key={index}>
                    <td style={{ border: "1px solid #ddd", padding: "10px" }}>{item.name}</td>
                    <td style={{ border: "1px solid #ddd", padding: "10px" }}>{item.phone}</td>
                    <td style={{ border: "1px solid #ddd", padding: "10px" }}>{item.address}</td>
                    <td style={{ border: "1px solid #ddd", padding: "10px" }}>{item.specialExp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div >

      {showAddSupervisor && (
        <AddSamparkYuvakModal modal={showAddSupervisor} setModal={setShowAddSupervisor} />
      )}
    </>
  )
}

export default TeamHome