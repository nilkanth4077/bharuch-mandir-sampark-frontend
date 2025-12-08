import React, { useState } from 'react'
import Header from '../components/Header'
import AddMemberModal from '../components/AddMemberModal';
import { Button } from 'reactstrap';
import LeaderTeams from '../components/SupervisorTeams';
import CreateTeamModal from '../components/CreateTeamModal';

const SupervisorHome = () => {
  const [showAddMember, setShowAddMember] = useState(false);
  const [showCreateTeam, setShowCreateTeam] = useState(false);

  const handleAddMember = () => setShowAddMember(true);

  const handleCreateTeam = () => setShowCreateTeam(true);

  return (
    <>
      <Header />
      <div
        style={{
          padding: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "center"
        }}
      >
        <Button style={{ flex: "1 1 calc(25% - 10px)", whiteSpace: "nowrap" }} color="warning" onClick={handleAddMember}>
          Add Member
        </Button>
        <Button style={{ flex: "1 1 calc(25% - 10px)", whiteSpace: "nowrap" }} color="warning" onClick={handleCreateTeam}>
          Create Team
        </Button>
      </div>

      <div>
        <LeaderTeams />
      </div>

      {showAddMember && (
        <AddMemberModal modal={showAddMember} setModal={setShowAddMember} />
      )}

      {showCreateTeam && (
        <CreateTeamModal modal={showCreateTeam} setModal={setShowCreateTeam} />
      )}
    </>
  )
}

export default SupervisorHome