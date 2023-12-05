import React from "react";
import Title from "@/templates/Title";
import { Box, Container, Grid, Typography } from "@mui/material";
import RoundedCard from "@/templates/RoundedCard";
import Link from "next/link";
import SecBtn from "@/templates/SecBtn";
import SOS from "./SOS";

const SectionWithCards = ({
  title,
  description,
  cards,
  hasBtn,
  btn,
  url,
  section,
}) => {
  return (
    <SOS>
      <section className="section-with-cards">
        <Container>
          <Box py={10}>
            <Box display={"flex"} justifyContent={"center"}>
              {title && (
                <Title>
                  <Typography variant="h3" color={"white"}>
                    {title}
                  </Typography>
                </Title>
              )}
            </Box>
            <Typography variant="h5" textAlign={"center"} mt={5} mb={10}>
              {description}
            </Typography>
            <Grid container spacing={5} justifyContent={"center"}>
              {cards.map((card) => (
                <Grid key={card.id} item xs={12} sm={4}>
                  <SOS>
                    <Link
                      href={
                        section === "our-services"
                          ? card.url
                          : "ar/our-services"
                      }
                    >
                      <RoundedCard
                        title={card.title}
                        description={card.description}
                        boxColor={card.boxColor}
                        section={section}
                      />
                    </Link>
                  </SOS>
                </Grid>
              ))}
            </Grid>
            {hasBtn === true && (
              <Box
                pt={5}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Link href={url}>
                  <SecBtn>{btn}</SecBtn>
                </Link>
              </Box>
            )}
          </Box>
        </Container>
      </section>
    </SOS>
  );
};

export default SectionWithCards;
