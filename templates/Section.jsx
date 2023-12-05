import { Box, Container } from "@mui/material";
import React from "react";
import SOS from "./SOS";

const Section = ({ children }) => {
  return (
    <SOS>
      <section>
        <Container>
          <Box py={5}>
            <Box bgcolor={"#0c1933"} borderRadius={5} overflow={"hidden"}>
              {children}
            </Box>
          </Box>
        </Container>
      </section>
    </SOS>
  );
};

export default Section;
