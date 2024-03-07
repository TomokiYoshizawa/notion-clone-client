import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import authUtils from "../../utils/AuthUtils";

import { setUser } from "../../redux/features/userSlice";

function AppLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // chek if user has JWT
    const checkAuth = async () => {
      const user = await authUtils.isAuthenticated();
      if (!user) {
        navigate("/login");
      } else {
        //if user exists, save the user to the store
        dispatch(setUser(user));
      }
    };
    checkAuth();
  }, [navigate]);
  return (
    <div className="appLayout">
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, p: 1, width: "max-content" }}>
          <Outlet />
        </Box>
      </Box>
    </div>
  );
}

export default AppLayout;
