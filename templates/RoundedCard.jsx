"use client";
import { Box, Container, Typography } from "@mui/material";
import ViewDayIcon from "@mui/icons-material/ViewDay";
import React, { useState } from "react";
import SOS from "./SOS";

const RoundedCard = ({ title, description, boxColor, section }) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <Box
      borderRadius={5}
      bgcolor={isActive ? "#197771" : "#0c1933"}
      py={3}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      sx={{
        "&:hover": { transform: "translateY(-20px)", transition: "0.3s all" },
      }}
    >
      <SOS>
        <Container>
          <Box
            display={"flex"}
            minHeight={220}
            height={section === "our-services" && 380}
          >
            <Box>
              <Box
                p={1}
                borderRadius={2}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                sx={{
                  background: boxColor,
                  filter: !isActive && "grayScale(70%)",
                }}
              >
                <ViewDayIcon sx={{ color: "white" }} />
              </Box>
            </Box>
            <Box mx={2}>
              <Typography variant="h6" color={"white"} mb={1}>
                {title}
              </Typography>
              <Typography lineHeight={2} color={isActive && "#0c1933"}>
                {description}
              </Typography>
            </Box>
          </Box>
        </Container>
      </SOS>
    </Box>
  );
};

export default RoundedCard;
