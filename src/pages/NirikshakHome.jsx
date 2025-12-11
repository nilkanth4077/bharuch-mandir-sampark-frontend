import React, { useState } from 'react'
import Header from '../components/Header'
import SupervisorMandals from '../components/SupervisorMandals';
import { Box, CardContent, Chip, Grid, Paper, TextField, Typography } from '@mui/material';
import { Button, Card } from 'reactstrap';
import SupervisorTeams from '../components/SupervisorTeams';
import { groupedByXetra } from '../api/data';
import { use } from 'react';
import { useNavigate } from 'react-router-dom';

const NirikshakHome = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("mandals");
  const [selectedMandal, setSelectedMandal] = useState(null);
  const [qMandal, setQMandal] = useState("");
  const [qSevak, setQSevak] = useState("");
  const [error] = useState(null);

  const sum = (rows, field) => rows.reduce((t, x) => t + (x[field] || 0), 0);

  const handleMandalCardClick = (m) => {
    setSelectedMandal(m.name);
    setMode("sevaks");
  };

  return (
    <>
      <Header />
      <h4 style={{ margin: "22px" }}>Mandal under your supervision (Nirikshak)</h4>
      {/* <SupervisorTeams /> */}

      <div>
        <Box p={2}>
          {/* ================== MANDALS VIEW ================== */}
          {mode === "mandals" && (
            <>

              {groupedByXetra.length === 0 && (
                <Paper sx={{ p: 2, textAlign: "center" }}>
                  {loading ? "Loading mandals…" : "No mandals found"}
                </Paper>
              )}

              {groupedByXetra.map(([xetra, rows]) => (
                <Box mb={3} key={xetra} onClick={() => navigate("/sampark-yuvak-team-wise")}>
                  {/* <Typography align="center" fontWeight={800} fontSize={23}>{xetra}</Typography> */}

                  <Grid container spacing={2} mt={1}>
                    {rows.map((m, i) => (
                      <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                        <Card onClick={() => handleMandalCardClick(m)} style={{ cursor: "pointer" }}>
                          <CardContent sx={{ textAlign: "center" }}>   {/* Center everything */}
                            <Typography fontWeight={700}>{m.name}</Typography>

                            <Box mt={1} display="flex" flexDirection="column" alignItems="center" gap={1}>
                              <Chip label={"Sanchalak: " + m.sanchalak_name} size="small" />
                              <Chip label={"Teams: " + m.mandal_target} size="small" />
                              <Chip label={"Sevak: " + m.mandal_filled_form} size="small" />
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>

                  <Paper sx={{ p: 1.5, textAlign: "center", mt: 1 }}>
                    Subtotal Filled: {sum(rows, "mandal_filled_form")} | Subtotal Target: {sum(rows, "mandal_target")}
                  </Paper>
                </Box>
              ))}
            </>
          )}
        </Box>
      </div>
    </>
  );
}

export default NirikshakHome