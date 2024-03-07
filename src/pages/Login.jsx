import { Box, Button, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../api/authApi.js";
import React from "react";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameErrText("");
    setPasswordErrText("");

    //get the form data
    const data = new FormData(e.target);
    const username = data.get("username")?.toString().trim() || "";
    const password = data.get("password")?.toString().trim() || "";

    let error = false;

    if (username === "") {
      error = true;
      setUsernameErrText("Username is required");
    }
    if (password === "") {
      error = true;
      setPasswordErrText("Password is required");
    }

    if (error) return;

    setLoading(true);

    //registering API
    try {
      const res = await authApi.login({
        username,
        password,
      });
      setLoading(false);
      localStorage.setItem("token", res.token);
      console.log("LOGIN!");
      navigate("/");
    } catch (err) {
      const errors = err.data.errors;

      errors.forEach((err) => {
        console.log(err);
        if (err.param === "username") {
          setUsernameErrText(err.msg);
        }
        if (err.param === "password") {
          setPasswordErrText(err.msg);
        }
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

        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          type="submit"
          loading={false}
          color="primary"
          variant="contained"
        >
          Login
        </LoadingButton>
      </Box>
      <Button component={Link} to="/register">
        You dont have an account? Register
      </Button>
    </div>
  );
}

export default Login;
