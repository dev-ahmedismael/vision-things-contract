"use client";
import SecBtn from "@/templates/SecBtn";
import Section from "@/templates/Section";
import { Box, Container, Typography } from "@mui/material";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import { useSelector } from "react-redux";

const PaymentRedirect = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const message = searchParams.get("message");

  return (
    <Section>
      <Container>
        <Box py={5}>
          <Box display={"flex"} justifyContent={"center"} mb={5}>
            {status === "paid" && message === "Succeeded" ? (
              <TaskAltIcon fontSize="large" sx={{ color: "#51a29d" }} />
            ) : (
              <ClearIcon fontSize="large" sx={{ color: "red" }} />
            )}
          </Box>
          <Typography textAlign={"center"} mb={5}>
            {status === "paid" && message === "Succeeded"
              ? "تمت عملية الدفع بنجاح  "
              : "    لم تتم عملية الدفع، برجاء التحقق من البيانات والمحاولة مرة أخرى"}
          </Typography>
          <Box display={"flex"} justifyContent={"center"}>
            {status === "paid" && message === "Succeeded" ? (
              <Link href={"/final-contract"}>
                <SecBtn>اضغط هنا للذهاب إلى صفحة تحميل العقد والفاتورة</SecBtn>
              </Link>
            ) : (
              <Link href={"/ar/contract/payment"}>
                <SecBtn>اضغط هنا للعودة إلى الصفحة السابقة</SecBtn>
              </Link>
            )}
          </Box>
        </Box>
      </Container>
    </Section>
  );
};

export default PaymentRedirect;
