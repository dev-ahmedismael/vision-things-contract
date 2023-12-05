"use client";
import Section from "@/templates/Section";
import React, { useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

import Title from "@/templates/Title";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { redirect } from "next/navigation";
import Link from "next/link";

const ContractTerms = () => {
  const points = [
    "العقد إلكتروني، ويتم إصداره بخطوة واحدة بعد دفع العقد ويمكن التحقق منه من خلال QR.",
    "ويكون العميل أو الطرف الثاني مسؤولاً عن البيانات المدخلة في العقد.",
    "تم إصدار العقد من قبل منشأة مرخصة لتقديم خدمة الصيانة للجهات الأمنية من قبل الهيئة العليا للأمن الصناعي.",
    "لا يمكن طلب استرداد الأموال إذا تمت طباعة العقد أو تحميل العقد.",
    "ستكون هناك رسوم إضافية إذا طلب العميل الزيارة.",
  ];

  const [itemOne, setItemOne] = useState(false);
  const [itemTwo, setItemTwo] = useState(false);
  const handleItemOneChange = () => {
    setItemOne(!itemOne);
  };
  const handleItemTwoChange = () => {
    setItemTwo(!itemTwo);
  };
  return (
    <Section>
      <Container>
        <Box py={5} sx={{ direction: "rtl" }}>
          <Title>
            <Typography variant="h5" color={"white"}>
              مرحبا بكم في خدمة العقد الالكتروني لصيانة كاميرات أمنية
            </Typography>
          </Title>
          <Typography variant="h6" my={3}>
            الأحكام والشروط:
          </Typography>
          <ol>
            {points.map((point, index) => (
              <li key={index}>
                <Typography mb={1}>{point}</Typography>
              </li>
            ))}
          </ol>
          <Box py={5}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="أوافق على هذه الشروط والأحكام وبقية الشروط والأحكام."
                onChange={handleItemOneChange}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="أوافق على سياسة الإسترجاع والخصوصية."
                onChange={handleItemTwoChange}
              />
            </FormGroup>
          </Box>
          <Box
            borderTop={"2px solid white"}
            display={"flex"}
            justifyContent={"space-between"}
            pt={5}
          >
            <Button
              variant="outlined"
              disabled
              sx={{
                height: 60,
                borderRadius: 2,
                px: 5,
                borderColor: "lightgray",
                color: "white",
                "&.Mui-disabled": {
                  color: "#c0c0c0",
                  border: "1px solid #c0c0c0",
                },
              }}
            >
              الرجوع إلى الخلف
            </Button>
            {itemOne === true && itemTwo === true ? (
              <Link href={"/personal-information"}>
                <Button
                  variant="outlined"
                  sx={{
                    "&:hover": {
                      backgroundImage:
                        "linear-gradient(to right,#21C8F6,#637BFF)",
                      border: "none",
                    },
                    height: 60,
                    borderRadius: 2,
                    px: 5,
                    borderColor: "#21C8F6",
                    color: "white",
                  }}
                >
                  التقدم للأمام
                </Button>
              </Link>
            ) : (
              <Tooltip
                placement="top-end"
                title="برجاء الموافقة على البنود أولا"
              >
                <Box>
                  <Button
                    variant="outlined"
                    disabled
                    sx={{
                      height: 60,
                      borderRadius: 2,
                      px: 5,
                      borderColor: "lightgray",
                      color: "white",
                      "&.Mui-disabled": {
                        color: "#c0c0c0",
                        border: "1px solid #c0c0c0",
                      },
                    }}
                  >
                    التقدم للأمام
                  </Button>
                </Box>
              </Tooltip>
            )}
          </Box>
        </Box>
      </Container>
    </Section>
  );
};

export default ContractTerms;
