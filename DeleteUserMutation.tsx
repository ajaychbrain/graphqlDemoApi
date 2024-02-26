import React from "react";
import { Button } from "@mui/material";

interface DeleteButtonProps {
  onClick: () => void;
}

const DeleteUserMutation: React.FC<DeleteButtonProps> = ({ onClick }) => {
  return (
    <Button variant="contained" color="error" onClick={onClick}>
      Delete
    </Button>
  );
};

export default DeleteUserMutation;
