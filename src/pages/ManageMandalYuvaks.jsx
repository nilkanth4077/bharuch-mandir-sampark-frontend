import React, { useEffect, useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import AddSupervisorModal from '../components/AddSupervisorModal';
import Header from '../components/Header';
import AddMandalYuvakModal from '../components/AddMandalYuvakModal';
import { mandalYuvaks } from '../api/data';
import { Box, TextField } from '@mui/material';
import { BACKEND_ENDPOINT } from '../api/api';
import axios from 'axios';

const ManageMandalYuvaks = () => {
    const navigate = useNavigate();
    const [showAddSupervisor, setShowAddSupervisor] = useState(false);
    const [qMandal, setQMandal] = useState("");

    const handleAddSupervisor = () => setShowAddSupervisor(true);

    const showUpdateSupervisorModal = () => {
        alert("Update Mandal Yuvak clicked");
    }

    const showDeleteSupervisorModal = () => {
        alert("Delete Mandal Yuvak clicked");
    }

    const location = useLocation();
    const { mandalId } = location.state || {};
    const sevakDetails = JSON.parse(localStorage.getItem("sevakDetails"));
    const password = localStorage.getItem("password");

    console.log("Mandal ID from location:", mandalId);

    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const fetchTeams = async () => {
            if (!mandalId) return;
            try {
                const response = await axios.get(`${BACKEND_ENDPOINT}/api/teams/mandal/${mandalId}`, {
                    auth: {
                        username: sevakDetails.userId, // e.g., ADMIN001
                        password: password
                    }
                });
                setTeams(response.data);
            } catch (error) {
                console.error("Error fetching teams:", error);
            }
        };

        fetchTeams();
    }, [mandalId]);

    console.log("Teams for mandal:", teams);

    return (
        <>
            <Header />
            <div style={{ padding: '20px' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <h5 style={{ margin: 0 }}>Mandal Yuvak (Static)</h5>

                    <Button color="warning" onClick={handleAddSupervisor}>
                        Add Mandal Yuvak
                    </Button>
                </div>
                <Box my={2}>
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Search here..."
                        value={qMandal}
                        onChange={(e) => setQMandal(e.target.value)}
                    />
                </Box>
                <div style={{ overflowX: "auto", marginTop: "20px" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
                        <thead>
                            <tr style={{ backgroundColor: "#f2f2f2" }}>
                                <th style={{ border: "1px solid #ddd", padding: "10px" }}>ID</th>
                                <th style={{ border: "1px solid #ddd", padding: "10px" }}>Name</th>
                                <th style={{ border: "1px solid #ddd", padding: "10px" }}>Phone</th>
                                <th style={{ border: "1px solid #ddd", padding: "10px" }}>Team</th>
                                <th style={{ border: "1px solid #ddd", padding: "10px" }}>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {mandalYuvaks.map((item) => (
                                <tr key={item.id}>
                                    <td style={{ border: "1px solid #ddd", padding: "10px" }}>{item.id}</td>
                                    <td style={{ border: "1px solid #ddd", padding: "10px" }}>{item.name}</td>
                                    <td style={{ border: "1px solid #ddd", padding: "10px" }}>{item.phone}</td>
                                    <td style={{ border: "1px solid #ddd", padding: "10px" }}>{item.team}</td>
                                    <td style={{ border: "1px solid #ddd", padding: "10px", textAlign: "center" }}>
                                        <FaEdit
                                            style={{ cursor: "pointer", marginRight: "15px" }}
                                            size={18}
                                            color="green"
                                            onClick={() => showUpdateSupervisorModal(item)}
                                        />
                                        <FaTrash
                                            style={{ cursor: "pointer" }}
                                            size={18}
                                            color="red"
                                            onClick={() => showDeleteSupervisorModal(item)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div >

            {showAddSupervisor && (
                <AddMandalYuvakModal modal={showAddSupervisor} setModal={setShowAddSupervisor} />
            )}
        </>
    )
}

export default ManageMandalYuvaks