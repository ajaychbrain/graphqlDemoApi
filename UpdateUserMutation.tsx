import React from "react";
import { Button } from "@mui/material";

interface UpdateButtonProps {
  onClick: () => void;
}

const UpdateUserMutation: React.FC<UpdateButtonProps> = ({ onClick }) => {
  return (
    <Button variant="contained" color="secondary" onClick={onClick}>
      Edit
    </Button>
  );
};

export default UpdateUserMutation;
