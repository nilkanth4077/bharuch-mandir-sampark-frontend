import React, { useState } from 'react'
import Header from '../components/Header'
import SupervisorMandals from '../components/SupervisorMandals';
import { Box, CardActionArea, CardContent, Chip, Dialog, DialogContent, DialogTitle, Grid, Typography } from '@mui/material';
import { Button, Card } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleNavigate = (path) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <>
      <Header />
      {/* <SupervisorMandals /> */}

      <div>
        <h4 style={{ marginInline: "22px", marginTop: "25px" }}>Admin Dashboard</h4>
        <Grid container spacing={2} sx={{ p: 2 }}>

          {/* CARD 1 */}
          <Grid item xs={6} md={6}>
            <Card sx={{
              aspectRatio: "1/1",
              background: "#ff6b6b", color: "#fff",
              borderRadius: 3, boxShadow: 3, display: "flex",
              justifyContent: "center", alignItems: "center",
              ":hover": { boxShadow: 6, transform: "scale(1.05)", transition: "0.3s" }
            }}>
              <CardActionArea sx={{ height: "100%" }} onClick={handleCardClick}>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h6" fontWeight="bold">Select Kshetra</Typography>
                  <Typography style={{ whiteSpace: "nowrap" }}>Kshetra wise details</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Select an Option</DialogTitle>
            <DialogContent
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                paddingTop: 2,
              }}
            >
              <Button
                variant="contained"
                onClick={() => handleNavigate("/nirdeshak-home")}
              >
                Kshetra 1
              </Button>

              <Button
                variant="contained"
                onClick={() => handleNavigate("/nirdeshak-home")}
              >
                Kshetra 2
              </Button>

              <Button
                variant="contained"
                onClick={() => handleNavigate("/nirdeshak-home")}
              >
                Kshetra 3
              </Button>

              <Button
                variant="outlined"
                color="error"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </DialogContent>
          </Dialog>

          {/* CARD 2 */}
          <Grid item xs={6} md={6}>
            <Card sx={{
              aspectRatio: "1/1",
              background: "#4dabf7", color: "#fff",
              borderRadius: 3, boxShadow: 3, display: "flex",
              justifyContent: "center", alignItems: "center",
              ":hover": { boxShadow: 6, transform: "scale(1.05)", transition: "0.3s" }
            }}>
              <CardActionArea sx={{ height: "100%" }} onClick={() => navigate("/manage-supervisor")}>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h6" fontWeight="bold">Roles</Typography>
                  <Typography style={{ whiteSpace: "nowrap" }}>Add new role</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          {/* CARD 3 */}
          {/* <Grid item xs={6} md={3}>
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
          </Grid> */}

          {/* CARD 4 */}
          {/* <Grid item xs={6} md={3}>
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
          </Grid> */}

        </Grid>
      </div>

    </>
  )
}

export default AdminHome