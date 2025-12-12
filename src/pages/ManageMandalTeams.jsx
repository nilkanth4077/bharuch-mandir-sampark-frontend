import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import { Button } from 'reactstrap';
import SupervisorTeams from '../components/SupervisorTeams';
import CreateTeamModal from '../components/CreateTeamModal';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_ENDPOINT } from '../api/api';

const ManageMandalTeams = () => {

    const [showCreateTeam, setShowCreateTeam] = useState(false);
    const handleTeamCreation = () => setShowCreateTeam(true);
    const [reloadTeams, setReloadTeams] = useState(false);

    const refreshTeams = () => setReloadTeams(prev => !prev);

    const location = useLocation();
    const { mandalId } = location.state || {};

    return (

        <>
            <Header />
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '20px',
                marginInline: '15px'
            }}>
                <h5 style={{ margin: 0, whiteSpace: "nowrap" }}>Manage Teams</h5>

                <Button color="warning" onClick={handleTeamCreation}>
                    <span style={{ whiteSpace: "nowrap" }}>Create Team</span>
                </Button>
            </div>
            <SupervisorTeams reload={reloadTeams} />

            {showCreateTeam && (
                <CreateTeamModal modal={showCreateTeam} setModal={setShowCreateTeam} mandalId={mandalId} refreshTeams={refreshTeams} />
            )}
        </>
    )
}

export default ManageMandalTeams