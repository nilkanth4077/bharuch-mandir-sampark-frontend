import React, { useEffect, useState } from "react";
import { FaEdit, FaPencilAlt, FaTrash } from "react-icons/fa";
import EditMemberModal from "./EditMandalYuvakModal";
import { teamMandalData, teamSamparkData } from "../api/data";
import EditMandalYuvakModal from "./EditMandalYuvakModal";
import EditTeamModal from "./EditTeamModal";
import { useLocation } from "react-router-dom";
import { BACKEND_ENDPOINT } from "../api/api";
import axios from "axios";

export default function SupervisorTeams({ reload }) {
    const [openTeam, setOpenTeam] = useState(null);
    const [showEditMember, setShowEditMember] = useState(false);
    const [showEditTeam, setShowEditTeam] = useState(false);
    const [loading, setLoading] = useState(true);

    const sevakDetails = JSON.parse(localStorage.getItem("sevakDetails"));
    const password = localStorage.getItem("password");
    const role = sevakDetails.role;
    const isAdmin = role === "ADMIN";
    const isSanchalak = role === "SANCHALAK";

    const handleEditMember = () => setShowEditMember(true);
    const handleDeleteMember = () => {
        alert("Sure want to remove member from this team ?");
    };
    const handleEditTeam = () => setShowEditTeam(true);

    const toggleOpen = (teamId) => {
        setOpenTeam(openTeam === teamId ? null : teamId);
    };

    const showUpdateMemberModal = () => {
        alert("Update Member clicked");
    }

    const showDeleteMemberModal = () => {
        alert("Delete Member clicked");
    }

    const location = useLocation();
    const { mandalId } = location.state || {};

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
            } finally {
                setLoading(false);
            }
        };

        fetchTeams();
    }, [mandalId, reload]);

    console.log("Teams for mandal:", teams);

    return (
        <>
            {loading ? (
                <div style={{ textAlign: "center", marginTop: "50px" }}>
                    <div className="spinner-border text-primary" role="status" />
                    <p style={{ marginTop: "10px", fontSize: "16px" }}>Loading Teams...</p>
                </div>
            ) : (
                <div style={{ width: "90%", margin: "auto", marginTop: "30px" }}>

                    {teams.map(team => (
                        <div
                            key={team._id}
                            style={{
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                marginBottom: "12px",
                                background: "#fff",
                                boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
                            }}
                        >
                            <div
                                onClick={() => toggleOpen(team._id)}
                                style={{
                                    padding: "12px 16px",
                                    fontWeight: "600",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    cursor: "pointer",
                                    background: "#fafafa",
                                    fontSize: "17px"
                                }}
                            >
                                <span>
                                    <b>{team.name}</b>
                                    {" "}
                                    {/* ({team.filled_forms}/{team.target}) */}
                                    {/* <FaPencilAlt
                                    style={{
                                        cursor: "pointer",
                                        marginLeft: "8px"
                                    }}
                                    size={18}
                                    color="green"
                                    onClick={handleEditTeam}
                                /> */}
                                </span>
                                <span>{openTeam === team._id ? "▲" : "▼"}</span>
                            </div>

                            {openTeam === team._id && (
                                <div style={{ padding: "12px", overflowX: "auto" }}>

                                    <table
                                        style={{
                                            width: "100%",
                                            borderCollapse: "collapse",
                                            textAlign: "left"
                                        }}
                                    >
                                        <thead>
                                            <tr style={{ background: "#f5f5f5" }}>
                                                <th style={th}>Sampark Yuvak Name</th>
                                                <th style={th}>Phone</th>
                                                {/* {(isAdmin || isSanchalak) ? <th style={th}>Actions</th> : null} */}
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {team.members.map(m => (
                                                <tr key={m._id}>
                                                    <td style={td}>{m.name}</td>
                                                    <td style={td}>{m.phone}</td>
                                                    {/* {(isAdmin || isSanchalak) && (
                                                        <td style={{ border: "1px solid #ddd", padding: "10px", textAlign: "center", whiteSpace: "nowrap" }}>
                                                            <FaEdit
                                                                style={{
                                                                    cursor: "pointer",
                                                                    marginRight: "15px"
                                                                }}
                                                                size={18}
                                                                color="green"
                                                                onClick={handleEditMember}
                                                            />
                                                            <FaTrash
                                                                style={{
                                                                    cursor: "pointer",
                                                                    marginRight: "15px"
                                                                }}
                                                                size={18}
                                                                color="red"
                                                                onClick={handleDeleteMember}
                                                            />
                                                        </td>
                                                    )} */}
                                                </tr>
                                            ))}
                                        </tbody>

                                    </table>
                                </div>
                            )}
                        </div>
                    ))}

                </div>
            )}

            {showEditMember && (
                <EditMandalYuvakModal modal={showEditMember} setModal={setShowEditMember} />
            )}

            {showEditTeam && (
                <EditTeamModal modal={showEditTeam} setModal={setShowEditTeam} />
            )}
        </>
    );
}

const th = {
    padding: "10px",
    borderBottom: "2px solid #ddd",
    fontSize: "14px",
    textAlign: "center",
    whiteSpace: "nowrap"
};

const td = {
    padding: "10px",
    borderBottom: "1px solid #eee",
    fontSize: "14px",
    textAlign: "center",
    whiteSpace: "nowrap"
};