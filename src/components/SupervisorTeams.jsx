import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditMemberModal from "./EditMemberModal";

export default function SupervisorTeams() {
    const [openTeam, setOpenTeam] = useState(null);
    const [showEditMember, setShowEditMember] = useState(false);

    const sevakDetails = JSON.parse(localStorage.getItem("sevakDetails"));
    const role = sevakDetails.role;
    const isAdmin = role === "Admin";
    const isSanchalak = role === "Sanchalak";

    const handleEditMember = () => setShowEditMember(true);

    const toggleOpen = (teamId) => {
        setOpenTeam(openTeam === teamId ? null : teamId);
    };

    const leaderData = {
        teams: [
            {
                id: 1,
                teamName: "Team A",
                members: [
                    { id: 1, sevak_id: "AK01", name: "Harsh", mandal_name: "Akshardham", filled_form: 10, sevak_target: 15, phone_number: "9999999999" },
                    { id: 2, sevak_id: "AK02", name: "Nirav", mandal_name: "Akshardham", filled_form: 12, sevak_target: 15, phone_number: "8888888888" },
                    { id: 3, sevak_id: "AK03", name: "Kunal", mandal_name: "Akshardham", filled_form: 9, sevak_target: 10, phone_number: "7777777777" }
                ]
            },
            {
                id: 2,
                teamName: "Team B",
                members: [
                    { id: 1, sevak_id: "AK01", name: "Harsh", mandal_name: "Akshardham", filled_form: 10, sevak_target: 15, phone_number: "9999999999" },
                    { id: 2, sevak_id: "AK02", name: "Nirav", mandal_name: "Akshardham", filled_form: 12, sevak_target: 15, phone_number: "8888888888" },
                    { id: 3, sevak_id: "AK03", name: "Kunal", mandal_name: "Akshardham", filled_form: 9, sevak_target: 10, phone_number: "7777777777" }
                ]
            }
        ]
    };

    const showUpdateMemberModal = () => {
        alert("Update Member clicked");
    }

    const showDeleteMemberModal = () => {
        alert("Delete Member clicked");
    }

    return (
        <>
            <div style={{ width: "90%", margin: "auto", marginTop: "30px" }}>

                {leaderData.teams.map(team => (
                    <div
                        key={team.id}
                        style={{
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            marginBottom: "12px",
                            background: "#fff",
                            boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
                        }}
                    >
                        <div
                            onClick={() => toggleOpen(team.id)}
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
                            {team.teamName}
                            <span>{openTeam === team.id ? "▲" : "▼"}</span>
                        </div>

                        {openTeam === team.id && (
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
                                            <th style={th}>Id</th>
                                            <th style={th}>Name</th>
                                            <th style={th}>Phone</th>
                                            <th style={th}>Mandal</th>
                                            <th style={th}>Form Filled</th>
                                            <th style={th}>Target</th>
                                            {isAdmin || isSanchalak ? <th style={th}>Actions</th> : null}
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {team.members.map(m => (
                                            <tr key={m.id}>
                                                <td style={td}>{m.sevak_id}</td>
                                                <td style={td}>{m.name}</td>
                                                <td style={td}>{m.phone_number}</td>
                                                <td style={td}>{m.mandal_name}</td>
                                                <td style={td}>{m.filled_form}</td>
                                                <td style={td}>{m.sevak_target}</td>
                                                {isAdmin || isSanchalak && (
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
                                                    </td>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                            </div>
                        )}
                    </div>
                ))}

            </div>

            {showEditMember && (
                <EditMemberModal modal={showEditMember} setModal={setShowEditMember} />
            )}
        </>
    );
}

const th = {
    padding: "10px",
    borderBottom: "2px solid #ddd",
    fontSize: "14px",
    textAlign: "center"
};

const td = {
    padding: "10px",
    borderBottom: "1px solid #eee",
    fontSize: "14px",
    textAlign: "center"
};