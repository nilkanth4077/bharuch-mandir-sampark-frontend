import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button, TextField, FormControl } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { BACKEND_ENDPOINT } from "../api/api";
import axios from "axios";
import { FaPlus, FaMinus } from "react-icons/fa";

function CreateTeamModal({ modal, setModal, mandalId, refreshTeams }) {
  const sevakDetails = JSON.parse(localStorage.getItem("sevakDetails")) || {};
  const password = localStorage.getItem("password");

  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    members: [{ name: "", phone: "" }],
  });
  const [errors, setErrors] = useState({});

  const toggle = () => setModal(!modal);

  const handleChange = (e, index) => {
    const { name, value } = e.target;

    if (name === "name") {
      // team name
      setFormData((p) => ({ ...p, name: value }));
    } else {
      // member fields
      const members = [...formData.members];
      if (name === "memberName") members[index].name = value;
      if (name === "memberPhone") members[index].phone = value;

      setFormData((p) => ({ ...p, members }));
    }
  };

  const addMember = () => {
    setFormData((p) => ({ ...p, members: [...p.members, { name: "", phone: "" }] }));
  };

  const removeMember = (index) => {
    const members = [...formData.members];
    members.splice(index, 1);
    setFormData((p) => ({ ...p, members }));
  };

  const validateForm = () => {
    const errs = {};
    if (!formData.name) errs.name = "Enter team name";

    formData.members.forEach((m, i) => {
      if (!m.name) errs[`memberName${i}`] = "Enter member name";
      if (!m.phone || m.phone.length !== 10) {
        errs[`memberPhone${i}`] = "Phone must be exactly 10 digits";
      }
    });

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setLoader(false);
      return;
    }

    try {
      const payload = {
        name: formData.name,
        mandalId: mandalId,
        members: formData.members,
      };

      const response = await axios.post(`${BACKEND_ENDPOINT}/api/teams`, payload, {
        auth: { username: sevakDetails.userId, password },
      });
      console.log("Team created:", response.data);

      toast.success("Team created successfully!");
      refreshTeams();
      setTimeout(() => {
        toggle();
      }, 3000);
    } catch (error) {
      console.error("Error creating team:", error);
      toast.error("Failed to create team");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create Team</ModalHeader>
        <ModalBody>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Team Name"
              name="name"
              value={formData.name}
              onChange={(e) => {
                let value = e.target.value.toUpperCase();     // convert to uppercase

                // allow only A-Z and only 1 character
                if (/^[A-Z]?$/.test(value)) {
                  handleChange({ target: { name: "name", value } });
                }
              }}
              error={!!errors.name}
              helperText={errors.name}
            />
          </FormControl>

          <h6 style={{ marginTop: "20px" }}>Team Members</h6>
          {formData.members.map((member, index) => (
            <div
              key={index}
              style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "10px" }}
            >
              <TextField
                label="Name"
                name="memberName"
                value={member.name}
                onChange={(e) => handleChange(e, index)}
                error={!!errors[`memberName${index}`]}
                helperText={errors[`memberName${index}`]}
                fullWidth
              />
              <TextField
                label="Phone"
                name="memberPhone"
                value={member.phone}
                onChange={(e) => handleChange(e, index)}
                error={!!errors[`memberPhone${index}`]}
                helperText={errors[`memberPhone${index}`]}
                fullWidth
                inputProps={{ inputMode: "numeric", pattern: "[0-9]{10}", maxLength: 10 }}
              />
              <Button
                color="error"
                onClick={() => removeMember(index)}
                disabled={formData.members.length === 1}
              >
                <FaMinus />
              </Button>
            </div>
          ))}

          <Button color="primary" onClick={addMember} style={{ marginTop: "10px" }}>
            <FaPlus /> Add Member
          </Button>
        </ModalBody>

        <ModalFooter>
          <Button variant="contained" color="secondary" onClick={handleSubmit} disabled={loader}>
            {loader ? <CircularProgress size={24} /> : "Create Team"}
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={toggle}
            disabled={loader}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <ToastContainer position="top-center" autoClose={5000} pauseOnHover theme="colored" />
    </div>
  );
}

export default CreateTeamModal;