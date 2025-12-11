import React, { useEffect, useMemo, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { BACKEND_ENDPOINT } from "../api/api";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Button,
  Checkbox,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

function AddSupervisorModal({ modal, setModal }) {
  const me = JSON.parse(localStorage.getItem("sevakDetails")) || {};
  const mySevakCode = me?.sevak_code || me?.sevak_id || "";

  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    post: "",
    mandal: "",
    kshetra: "",
  });
  const [errors, setErrors] = useState({});

  const toggle = () => setModal(!modal);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let v = value;

    setFormData((p) => ({ ...p, [name]: v }));
  };

  const validateForm = () => {
    const errs = {};

    if (!formData.post) errs.post = "Select a post";

    if (!formData.name) errs.name = "Enter name";

    if (!formData.phone) errs.phone = "Enter phone number";

    if (formData.post === "nirdeshak" && !formData.kshetra) {
      errs.kshetra = "Select kshetra";
    }

    if (formData.post === "nirikshak" && (!formData.mandal || formData.mandal.length === 0)) {
      errs.mandal = "Select at least one mandal";
    }

    if (formData.post === "sanchalak" && !formData.mandal) {
      errs.mandal = "Select a mandal";
    }

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
        phone: formData.phone,
        post: formData.post,
        mandal: formData.mandal,
        khetra: formData.kshetra,
        sevak_id: mySevakCode,
      };

      alert("Work in progress: " + JSON.stringify(payload));

    } catch (error) {
      console.error("add_supervisor error:", error);
      toast.error(error || "An error occurred");
    } finally {
      setLoader(false);
      toggle();
    }
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add Role</ModalHeader>
        <ModalBody>
          <FormControl fullWidth variant="outlined" margin="normal">
            <TextField
              label="Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              variant="outlined"
              color="secondary"
              error={!!errors.name}
              helperText={errors.name}
              fullWidth
            />
          </FormControl>

          <FormControl fullWidth variant="outlined" margin="normal">
            <TextField
              label="Phone No"
              name="phone"
              type="tel"
              value={formData.phone || ""}
              onChange={handleChange}
              variant="outlined"
              color="secondary"
              error={Boolean(errors.phone)}
              helperText={errors.phone}
              fullWidth
              inputProps={{ inputMode: "numeric", pattern: "[0-9]{10}", maxLength: 10 }}
            />
          </FormControl>

          <FormControl fullWidth variant="outlined" margin="normal" size="small">
            <InputLabel id="post-select-label">Select Post</InputLabel>
            <Select
              labelId="post-select-label"
              label="Post"
              name="post"
              value={formData.post}
              onChange={handleChange}
              error={!!errors.post}
            >
              <MenuItem key="nirdeshak" value="nirdeshak">
                Nirdeshak
              </MenuItem>
              <MenuItem key="nirikshak" value="nirikshak">
                Nirikshak
              </MenuItem>
              <MenuItem key="sanchalak" value="sanchalak">
                Sanchalak
              </MenuItem>
            </Select>
            {errors.post && (
              <div style={{ color: "#d32f2f", fontSize: 12, marginTop: 4 }}>{errors.post}</div>
            )}
          </FormControl>

          {/* Dynamic Fields Based on Post Selection */}
          {formData.post === "nirdeshak" && (
            <FormControl fullWidth margin="normal" size="small">
              <InputLabel id="kshetra-label">Select Kshetra</InputLabel>
              <Select
                labelId="kshetra-label"
                label="Select Kshetra"
                name="kshetra"
                value={formData.kshetra || ""}
                onChange={handleChange}
              >
                <MenuItem value="North">Kshetra 1</MenuItem>
                <MenuItem value="South">Kshetra 2</MenuItem>
                <MenuItem value="East">Kshetra 3</MenuItem>
              </Select>
            </FormControl>
          )}

          {formData.post === "nirikshak" && (
            <FormControl fullWidth margin="normal" size="small">
              <InputLabel id="mandal-multi-label">Select Mandals</InputLabel>
              <Select
                labelId="mandal-multi-label"
                multiple
                label="Select Mandals"
                name="mandal"
                value={formData.mandal || []}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, mandal: e.target.value }))
                }
                renderValue={(selected) => selected.join(", ")}
              >
                {["SJ", "NK", "SRB"].map((m) => (
                  <MenuItem key={m} value={m}>
                    <Checkbox checked={(formData.mandal || []).indexOf(m) > -1} />
                    <span>{m}</span>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {formData.post === "sanchalak" && (
            <FormControl fullWidth margin="normal" size="small">
              <InputLabel id="mandal-single-label">Select Mandal</InputLabel>
              <Select
                labelId="mandal-single-label"
                label="Select Mandal"
                name="mandal"
                value={formData.mandal || ""}
                onChange={handleChange}
              >
                <MenuItem value="SJ">Sahjanand (SJ)</MenuItem>
                <MenuItem value="NK">Narayankunj (NK)</MenuItem>
                <MenuItem value="SRB">Surbhi (SRB)</MenuItem>
              </Select>
            </FormControl>
          )}

        </ModalBody>

        <ModalFooter>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSubmit}
            disabled={loader}
          >
            {loader ? <CircularProgress size={24} /> : "Add"}
          </Button>
          <Button
            color="error"
            style={{ margin: "10px" }}
            variant="contained"
            onClick={toggle}
            disabled={loader}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <ToastContainer position="top-center" autoClose={5000} pauseOnHover theme="colored" />
    </div>
  );
}

export default AddSupervisorModal;
