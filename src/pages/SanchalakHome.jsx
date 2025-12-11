import React, { useState } from 'react'
import Header from '../components/Header'
import SupervisorMandals from '../components/SupervisorMandals';
import { Box, CardActionArea, CardContent, Chip, Grid, Paper, TextField, Typography } from '@mui/material';
import { Button, Card } from 'reactstrap';
import SupervisorTeams from '../components/SupervisorTeams';
import CreateTeamModal from '../components/CreateTeamModal';
import { useNavigate } from 'react-router-dom';

const SanchalakHome = () => {

  const navigate = useNavigate();

  return (
    <>
      <Header />

      <div>
        <h4 style={{ marginInline: "22px", marginTop: "25px" }}>Mandal Name</h4>
        <Grid container spacing={2} sx={{ p: 2 }}>

          {/* CARD 1 */}
          <Grid item xs={6} md={3}>
            <Card sx={{
              aspectRatio: "1/1",
              background: "#ff6b6b", color: "#fff",
              borderRadius: 3, boxShadow: 3, display: "flex",
              justifyContent: "center", alignItems: "center",
              ":hover": { boxShadow: 6, transform: "scale(1.05)", transition: "0.3s" }
            }}>
              <CardActionArea sx={{ height: "100%" }} onClick={() => navigate("/manage-mandal-yuvaks")}>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h6" fontWeight="bold">Mandal</Typography>
                  <Typography style={{ whiteSpace: "nowrap" }}>Add Mandal Yuvak</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          {/* CARD 2 */}
          <Grid item xs={6} md={3}>
            <Card sx={{
              aspectRatio: "1/1",
              background: "#4dabf7", color: "#fff",
              borderRadius: 3, boxShadow: 3, display: "flex",
              justifyContent: "center", alignItems: "center",
              ":hover": { boxShadow: 6, transform: "scale(1.05)", transition: "0.3s" }
            }}>
              <CardActionArea sx={{ height: "100%" }} onClick={() => navigate("/manage-mandal-teams")}>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h6" fontWeight="bold">Teams</Typography>
                  <Typography style={{ whiteSpace: "nowrap" }}>View & Create Teams</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          {/* CARD 3 */}
          <Grid item xs={6} md={3}>
            <Card sx={{
              aspectRatio: "1/1",
              background: "#51cf66", color: "#fff",
              borderRadius: 3, boxShadow: 3, display: "flex",
              justifyContent: "center", alignItems: "center",
              ":hover": { boxShadow: 6, transform: "scale(1.05)", transition: "0.3s" }
            }}>
              <CardActionArea sx={{ height: "100%" }} onClick={() => navigate("/reports")}>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h6" fontWeight="bold">Statistics</Typography>
                  <Typography style={{ whiteSpace: "nowrap" }}>View analytics reports</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          {/* CARD 4 */}
          <Grid item xs={6} md={3}>
            <Card sx={{
              aspectRatio: "1/1",
              background: "#845ef7", color: "#fff",
              borderRadius: 3, boxShadow: 3, display: "flex",
              justifyContent: "center", alignItems: "center",
              ":hover": { boxShadow: 6, transform: "scale(1.05)", transition: "0.3s" }
            }}>
              <CardActionArea sx={{ height: "100%" }} onClick={() => navigate("/sampark-yuvak-team-wise")}>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h6" fontWeight="bold">Show Details</Typography>
                  <Typography style={{ whiteSpace: "nowrap" }}>Sampark Yuvak Details</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

        </Grid>
      </div>
    </>
  );
}

export default SanchalakHome