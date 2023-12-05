import { Button } from "@mui/material";
import React from "react";

const PrimaryBtn = ({ children }) => {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundImage: "linear-gradient(to right,#21C8F6,#637BFF)",
        height: 60,
        borderRadius: 2,
        px: 5,
      }}
    >
      {children}
    </Button>
  );
};

export default PrimaryBtn;
