import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import SupervisorMandals from '../components/SupervisorMandals';
import { Box, CardActionArea, CardContent, Chip, Grid, Paper, TextField, Typography } from '@mui/material';
import { Button, Card } from 'reactstrap';
import SupervisorTeams from '../components/SupervisorTeams';
import CreateTeamModal from '../components/CreateTeamModal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_ENDPOINT } from '../api/api';

const SanchalakHome = () => {

  const navigate = useNavigate();
  const sevakDetails = JSON.parse(localStorage.getItem("sevakDetails"));
  const password = localStorage.getItem("password");

  const [mandals, setMandals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [myMandal, setMyMandal] = useState(null);

  useEffect(() => {
    const fetchMandals = async () => {
      try {
        const response = await axios.get(`${BACKEND_ENDPOINT}/api/mandals`, {
          auth: {
            username: sevakDetails.userId, // e.g., ADMIN001
            password: password
          }
        });
        const allMandals = response.data;

        const myMandal = allMandals.find(m => m._id === sevakDetails.mandalId);
        setMyMandal(myMandal);

      } catch (error) {
        console.error("Error fetching mandals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMandals();
  }, []);

  console.log("Mandal assigned to sevak:", myMandal);

  return (
    <>
      <Header />

      <div>
        <h4 style={{ marginInline: "22px", marginTop: "25px" }}>{myMandal?.name}</h4>
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
              <CardActionArea sx={{ height: "100%" }}
                onClick={() => navigate("/manage-mandal-yuvaks", {
                  state: { mandalId: myMandal?._id }
                })}
              >
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
              <CardActionArea sx={{ height: "100%" }}
                onClick={() => navigate("/manage-mandal-teams", {
                  state: { mandalId: myMandal?._id }
                })}
              >
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
              <CardActionArea sx={{ height: "100%" }} onClick={() => navigate("/statistics")}>
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
                  <Typography style={{ whiteSpace: "nowrap" }}>Sampark Yuvak List</Typography>
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