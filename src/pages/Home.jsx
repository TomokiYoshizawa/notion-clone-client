import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import React from "react";
import memoApi from "../api/memoApi";
import { useNavigate } from "react-router-dom";

function Home() {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const createMemo = async () => {
    try {
      setLoading(true);
      // Create a memo
      const res = await memoApi.create();
      console.log(res);
      navigate(`/memo/${res._id}`);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LoadingButton
        variant="outlined"
        onClick={() => createMemo()}
        loading={loading}
      >
        Create a memo
      </LoadingButton>
    </Box>
  );
}

export default Home;
