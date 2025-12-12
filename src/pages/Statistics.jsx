import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    LabelList
} from "recharts";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

export const Statistics = () => {
    const navigate = useNavigate();
    const teamData = [
        { team: "Team A", target: 100, achieved: 80 },
        { team: "Team B", target: 120, achieved: 110 },
        { team: "Team C", target: 90, achieved: 50 },
        { team: "Team D", target: 150, achieved: 130 },
        { team: "Team E", target: 100, achieved: 20 },
        { team: "Team F", target: 120, achieved: 98 },
        { team: "Team G", target: 90, achieved: 65 },
        { team: "Team H", target: 150, achieved: 30 },
    ];

    const barData = teamData.map((t) => ({
        team: t.team,
        percentage: Math.round((t.achieved / t.target) * 100),
    }));

    const pieData = teamData.map((t) => ({
        name: t.team,
        value: t.achieved,
    }));

    const renderCustomizedLabel = ({ name, percent }) => {
        return `${name}`;
    };

    const COLORS = ["#0088FE", "#FF8042", "#00C49F", "#FFBB28"];

    return (
        <>
            <Header />
            <div style={{ padding: "20px" }}>
                <h2 style={{ textAlign: "center" }}>Statistics: Mandal Name (SJ) (Static)</h2>
                <h5>(210/450)</h5>

                {/* Responsive layout */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                        gap: "30px",
                    }}
                >
                    {/* Bar Chart */}
                    {/* <div style={{ width: "100%", height: 350 }}>
                        <ResponsiveContainer>
                            <BarChart data={barData}>
                                <XAxis dataKey="team" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="percentage" fill="#8884d8" onClick={() => navigate("/sampark-yuvak-info")} >
                                    <LabelList
                                        dataKey="percentage"
                                        position="top"
                                        formatter={(value) => `${value}%`}
                                    />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                        <h5 style={{ textAlign: "center", marginTop: "10px" }}>
                            (Fulfilled Target of All Teams)
                        </h5>
                    </div> */}

                    {/* Pie Chart */}
                    <div style={{ width: "100%", height: 350 }}>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    dataKey="value"
                                    nameKey="name"
                                    outerRadius={120}
                                    label={renderCustomizedLabel}
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell
                                            key={index}
                                            fill={COLORS[index % COLORS.length]}
                                            onClick={() => navigate("/sampark-yuvak-info")}
                                            cursor="pointer"
                                        />
                                    ))}
                                </Pie>

                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <h6 style={{ textAlign: "center", marginBottom: "10px" }}>
                            (Team-wise Fulfilled Target)
                        </h6>
                    </div>
                </div>
            </div>
        </>
    );
};