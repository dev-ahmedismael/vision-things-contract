"use client";
import { register } from "swiper/element/bundle";
import React, { useEffect, useRef } from "react";
import Title from "@/templates/Title";
import { Box, Container, Grid, Typography } from "@mui/material";
import urlsList from "@/public/data/urlsList";

register();

const Associated = ({ images }) => {
  const filteredImages = images.filter((image) => image !== null);
  const base_url = urlsList.baseUrl;
  const swiperRef = useRef(null);
  useEffect(() => {
    const swiperContainer = swiperRef.current;
    const params = {
      autoplay: true,
      loop: true,
      slidesPerView: 4,
      spaceBetween: 30,
    };

    Object.assign(swiperContainer, params);
    swiperContainer.initialize();
  }, []);
  return (
    <Box py={5}>
      <Container>
        <Box display={"flex"} justifyContent={"center"}>
          <Title>
            <Typography
              textAlign={"center"}
              variant="h3"
              color={"white"}
              mb={5}
            >
              Associated With
            </Typography>
          </Title>
        </Box>
        <Box>
          <swiper-container
            ref={swiperRef}
            init="false"
            space-between="30"
            autoplay-delay="2500"
            autoplay-disable-on-interaction="false"
          >
            {filteredImages.map((img, index) => (
              <swiper-slide key={index}>
                <Box mr={12}>
                  <img
                    src={`${base_url}/${img}`}
                    alt="Company Logo"
                    width={100}
                    height={100}
                  />
                </Box>
              </swiper-slide>
            ))}
          </swiper-container>
        </Box>
      </Container>
    </Box>
  );
};

export default Associated;
