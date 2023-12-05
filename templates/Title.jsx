import { Box } from "@mui/material";
import React from "react";

const Title = ({ children }) => {
  return (
    <Box className="title" position={"relative"}>
      {children}
    </Box>
  );
};

export default Title;
