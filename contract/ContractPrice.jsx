"use client";
import { calcTotalPrice } from "@/store/contractSlice";
import Section from "@/templates/Section";
import { Box, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ContractPrice = () => {
  const indoor_cameras =
    typeof window !== "undefined" &&
    parseInt(window?.localStorage?.indoor_cameras);
  const outdoor_cameras =
    typeof window !== "undefined" &&
    parseInt(window?.localStorage?.outdoor_cameras);
  const camerasCount = indoor_cameras + outdoor_cameras;

  const price = () => {
    if (camerasCount === 0) {
      return 0;
    } else if (camerasCount > 0 && camerasCount <= 4) {
      return 300;
    } else if (camerasCount > 4 && camerasCount <= 16) {
      return 750;
    } else if (camerasCount > 16 && camerasCount <= 32) {
      return 1300;
    } else if (camerasCount > 32 && camerasCount <= 64) {
      return 1800;
    } else return camerasCount * 40;
  };

  const vat = price() * 0.15;

  const totalPrice = price() + vat;

  const totalStatePrice = useSelector((state) => state.contract.totalPrice);
  const discount = useSelector((state) => state.contract.discount);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calcTotalPrice(totalPrice));
    if (typeof window !== "undefined") {
      localStorage.setItem("paid_amount", totalPrice);
    }
  }, []);

  return (
    <Section>
      <Box py={3}>
        <Box>
          <Container>
            <Typography variant="h5" color={"white"} mb={3}>
              السعر
            </Typography>
          </Container>
        </Box>
        <Box bgcolor={"#010e28"} py={2}>
          <Container>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography>السعر</Typography>
              <Typography>{price()} ريال سعودي</Typography>
            </Box>
          </Container>
        </Box>
        <Box py={2}>
          <Container>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography>ضريبة القيمة المضافة (15%)</Typography>
              <Typography>{vat} ريال سعودي</Typography>
            </Box>
          </Container>
        </Box>
        <Box bgcolor={"#010e28"} py={2}>
          <Container>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography>الخصم</Typography>
              <Typography>{discount}% </Typography>
            </Box>
          </Container>
        </Box>
        <Box py={2}>
          <Container>
            <Box
              borderTop={"2px solid white"}
              display={"flex"}
              justifyContent={"space-between"}
              pt={2}
            >
              <Typography>السعر الإجمالي</Typography>
              <Typography>
                {totalPrice - (totalPrice * discount) / 100} ريال سعودي
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    </Section>
  );
};

export default ContractPrice;
