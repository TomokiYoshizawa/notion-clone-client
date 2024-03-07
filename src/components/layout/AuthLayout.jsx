import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import notionLogo from "../../assets/images/notion-logo.png";
import authUtils from "../../utils/AuthUtils";

function AuthLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    // check if user has JWT
    const checkAuth = async () => {
      const isAuth = await authUtils.isAuthenticated();
      if (isAuth) {
        navigate("/");
      }
    };
    checkAuth();
  }, [navigate]);
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 6,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img
            src={notionLogo}
            alt="Notion Logo"
            style={{ width: 100, height: 100, marginBottom: 3 }}
          />
          Welcome to Notion Clone Develop
        </Box>
        <Outlet />
      </Container>
    </div>
  );
}

export default AuthLayout;
