import React from "react";
import Section from "./Section";
import { Box, Container, Typography } from "@mui/material";
import Title from "./Title";

const CenteredSection = ({ title, description }) => {
  return (
    <Section>
      <Box className="centered-section" py={5}>
        <Container>
          <Box display={"flex"} justifyContent={"center"}>
            {title && (
              <Title>
                <Typography
                  color="white"
                  variant="h3"
                  textAlign={"center"}
                  mb={5}
                >
                  {title}
                </Typography>
              </Title>
            )}
          </Box>

          <Typography textAlign={"center"} variant="h6">
            {description}
          </Typography>
        </Container>
      </Box>
    </Section>
  );
};

export default CenteredSection;
