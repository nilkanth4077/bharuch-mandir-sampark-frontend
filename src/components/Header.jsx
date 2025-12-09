import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Button,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

function Header(props) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("sevakDetails");
    navigate("/");
  };
  const handleTeamDetails = () => {
    navigate("/manage-teams");
  };

  const handleVyaktiDetails = () => {
    navigate("/sampark-vyakti-details");
  };

  const handleManageSSDetails = () => {
    navigate("/manage-sampark-sevak-details");
  };

  const sevakDetails = JSON.parse(localStorage.getItem("sevakDetails"));
  const role = sevakDetails.role;
  console.log(role, 'role');
  return (
    <div>
      <Navbar
        style={{ background: "#ED3237", marginBottom: "7px", zIndex: 1000 }}
      >
        <NavbarBrand style={{ color: "#ffffffff" }} href="/">
          Sampark 2025
        </NavbarBrand>

        <NavbarToggler style={{ background: "#ffffff" }} onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            {(role === "Sanchalak") && (
              <>
                <NavItem style={{ margin: "5px" }}>
                  <Button color="warning" onClick={handleManageSSDetails}>
                    Manage Sampark Sevak
                  </Button>
                </NavItem>
              </>
            )}
            {role === "Admin" && (
              <>
                <NavItem style={{ margin: "5px" }}>
                  <Button color="warning" onClick={handleVyaktiDetails}>
                    સંપર્ક થયેલા યુવકોની માહિતી
                  </Button>
                </NavItem>
                <NavItem style={{ margin: "5px" }}>
                  <Button color="primary" onClick={handleTeamDetails}>
                    Team Details
                  </Button>
                </NavItem>
              </>
            )}

            {role === "Admin" && (
              <>

              </>
            )}

            <NavItem style={{ margin: "5px" }}>
              <Button
                style={{
                  background: "#ffffff",
                  color: "black",
                  fontWeight: "bold",
                }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
