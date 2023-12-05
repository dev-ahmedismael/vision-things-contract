import { Button } from "@mui/material";
import React from "react";

const SecBtn = ({ children }) => {
  return (
    <Button
      variant="outlined"
      sx={{
        "&:hover": {
          backgroundImage: "linear-gradient(to right,#21C8F6,#637BFF)",
          border: "none",
        },
        height: 60,
        borderRadius: 2,
        px: 5,
        borderColor: "#21C8F6",
        color: "white",
      }}
    >
      {children}
    </Button>
  );
};

export default SecBtn;
