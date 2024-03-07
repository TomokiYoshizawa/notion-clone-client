import { Box, IconButton } from "@mui/material";
import { StarBorderOutlined } from "@mui/icons-material";
import { DeleteOutlined } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import memoApi from "../api/memoApi";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setMemo } from "../redux/features/memoSlice";
import { useSelector as UseSelector } from "react-redux";

function Memo() {
  const { memoId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const memos = UseSelector((state) => state.memo.value);

  useEffect(() => {
    const getMemo = async () => {
      try {
        const res = await memoApi.getOne(memoId);
        console.log(res.title);
        setTitle(res.title);
        setDescription(res.description);
      } catch (err) {
        alert(err);
      }
    };
    getMemo();
  }, [memoId]);

  let timer;
  const timeout = 500;

  const updateTitle = async (e) => {
    clearTimeout(timer);
    const newTitle = e.target.value;
    setTitle(newTitle);

    timer = setTimeout(async () => {
      try {
        await memoApi.updateOne(memoId, { title: newTitle });
      } catch (err) {
        console.log(err);
      }
    }, timeout);
  };

  const updateDescription = async (e) => {
    clearTimeout(timer);
    const newDescription = e.target.value;
    setDescription(newDescription);

    timer = setTimeout(async () => {
      try {
        await memoApi.updateOne(memoId, { description: newDescription });
      } catch (err) {
        console.log(err);
      }
    }, timeout);
  };

  const deleteMemo = async () => {
    try {
      const deleteMemo = await memoApi.deleteOne(memoId);
      console.log(deleteMemo);

      const newMemos = memos.filter((e) => e._id !== memoId);
      if (newMemos.length === 0) {
        navigate("/memo");
      } else {
        navigate(`/memo/${newMemos[0]._id}`);
      }
      dispatch(setMemo(newMemos));

      dispatch;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <IconButton>
          <StarBorderOutlined />
        </IconButton>
        <IconButton color="error" onClick={deleteMemo}>
          <DeleteOutlined />
        </IconButton>
      </Box>
      <Box sx={{ padding: "10px 50px" }}>
        <TextField
          onChange={updateTitle}
          value={title}
          placeholder="Title"
          variant="outlined"
          fullWidth
          sx={{
            ".MuiOutlinedInput-input": { padding: 0 },
            ".MuiOutlinedInput-notchedOutline": { border: "none" },
            ".MuiInputBase-root": { fontSize: "2rem", fontWeight: 700 },
          }}
        ></TextField>
        <TextField
          onChange={updateDescription}
          value={description}
          placeholder="add"
          variant="outlined"
          fullWidth
          sx={{
            ".MuiOutlinedInput-input": { padding: 0 },
            ".MuiOutlinedInput-notchedOutline": { border: "none" },
            ".MuiInputBase-root": { fontSize: "1rem" },
          }}
        ></TextField>
      </Box>
    </>
  );
}

export default Memo;
