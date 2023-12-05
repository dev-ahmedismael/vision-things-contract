import React from "react";
import Section from "@/templates/Section";
import Title from "@/templates/Title";
import { Box, Container, Grid, Typography } from "@mui/material";
import SecBtn from "./SecBtn";
import Link from "next/link";

const RtlSection = ({
  title,
  description,
  imgUrl,
  hasBtn,
  btnUrl,
  btnContent,
}) => {
  return (
    <Section>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <img src={imgUrl} alt={title} width={"100%"} />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
        >
          <Container>
            <Box py={5}>
              <Title>
                <Typography variant="h3" color={"white"} mb={3}>
                  {title}
                </Typography>
              </Title>
              <Typography lineHeight={2} mb={5}>
                {description}
              </Typography>
              {hasBtn && (
                <Link href={btnUrl}>
                  <SecBtn>{btnContent}</SecBtn>
                </Link>
              )}
            </Box>
          </Container>
        </Grid>
      </Grid>
    </Section>
  );
};

export default RtlSection;
