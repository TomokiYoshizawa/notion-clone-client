import { Box, Button, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../api/authApi.js";
import { useState } from "react";

function Register() {
  const navigate = useNavigate();

  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");
  const [confirmPasswordErrText, setConfirmPasswordErrText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameErrText("");
    setPasswordErrText("");
    setConfirmPasswordErrText("");

    //get the form data
    const data = new FormData(e.target);
    const username = data.get("username").trim();
    const password = data.get("password").trim();
    const confirmPassword = data.get("confirmPassword").trim();
    console.log(username);
    console.log(password);
    console.log(confirmPassword);

    let error = false;

    if (username === "") {
      error = true;
      setUsernameErrText("Username is required");
    }
    if (password === "") {
      error = true;
      setPasswordErrText("Password is required");
    }
    if (confirmPassword === "") {
      error = true;
      setConfirmPasswordErrText("Confirm Password is required");
    }
    if (password !== confirmPassword) {
      error = true;
      setConfirmPasswordErrText("Passwords do not match");
    }
    if (error) return;

    setLoading(true);

    //registering API
    try {
      const res = await authApi.register({
        username,
        password,
        confirmPassword,
      });
      setLoading(false);
      localStorage.setItem("token", res.token);
      console.log("new user registered");
      navigate("/");
    } catch (err) {
      const errors = err.data.errors;

      errors.forEach((err) => {
        console.log(err);
        if (err.path === "username") {
          setUsernameErrText(err.msg);
        }
        if (err.path === "password") {
          setPasswordErrText(err.msg);
        }
        if (err.path === "confirmPassword") {
          setConfirmPasswordErrText(err.msg);
        }
        console.log(confirmPasswordErrText);
      });
      setLoading(false);
    }
  };

  return (
    <div className="register">
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          id="username"
          label="name"
          margin="normal"
          name="username"
          required
          error={usernameErrText !== ""}
          helperText={usernameErrText}
          disabled={loading}
        />
        <TextField
          fullWidth
          id="password"
          label="password"
          margin="normal"
          name="password"
          type="password"
          required
          helperText={passwordErrText}
          error={passwordErrText !== ""}
          disabled={loading}
        />
        <TextField
          fullWidth
          id="confirmPassword"
          label="confirmPassword"
          margin="normal"
          name="confirmPassword"
          type="password"
          required
          helperText={confirmPasswordErrText}
          error={confirmPasswordErrText !== ""}
          disabled={loading}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          type="submit"
          loading={false}
          color="primary"
          variant="contained"
        >
          Create Account
        </LoadingButton>
      </Box>
      <Button component={Link} to="/login">
        Already have an account? Login
      </Button>
    </div>
  );
}

export default Register;
