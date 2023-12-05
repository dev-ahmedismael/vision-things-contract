"use client";
import Section from "@/templates/Section";

import {
  Box,
  Grid,
  Button,
  Typography,
  Container,
  TextField,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { saveProductDetails } from "@/store/contractSlice";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import urlsList from "@/public/data/urlsList";

const validationSchema = yup.object({
  indoor_cameras: yup
    .string()
    .required("ادخل عدد الكاميرات الداخلية")
    .matches(/^[0-9]+$/, "ادخل رقم صالح"),
  outdoor_cameras: yup
    .string()
    .required("ادخل عدد الكاميرات الخارجية")
    .matches(/^[0-9]+$/, "ادخل رقم صالح"),
  storage_device: yup.string(),
  period_of_record: yup.number(),
  show_screens: yup
    .string()
    .required("ادخل عدد شاشات العرض")
    .matches(/^[0-9]+$/, "ادخل رقم صالح"),
  camera_type: yup.string(),
});

const ContractProductDetails = () => {
  const url = urlsList.uncompleted;
  const personalInformation = useSelector(
    (state) => state.contract.personalInformation
  );
  const data = {
    name: personalInformation.name,
    phone: personalInformation.phone,
    email: personalInformation.email,
  };
  useEffect(() => {
    axios.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    });
  }, []);
  //
  const periods = [
    "1 شهر",
    "2 شهر",
    "3 شهر",
    "4 شهر",
    "5 شهر",
    "6 شهر",
    "7 شهر",
    "8 شهر",
    "9 شهر",
    "10 شهر",
    "11 شهر",
    "12 شهر",
  ];

  const dispatch = useDispatch();
  const router = useRouter();
  const productDetails = useSelector((state) => state.contract.productDetails);
  const formik = useFormik({
    initialValues: productDetails,
    validationSchema: validationSchema,
    onSubmit: (formData) => {
      dispatch(saveProductDetails(formData));
      let productDetails = Object.entries(formData);
      if (typeof window !== "undefined") {
        for (let i = 0; i < productDetails.length; i++) {
          localStorage.setItem(productDetails[i][0], productDetails[i][1]);
        }
      }
      router.push("/payment");
    },
  });

  return (
    <Section>
      <Container>
        <Box py={5} sx={{ direction: "rtl" }}>
          <form className="ar-form" onSubmit={formik.handleSubmit}>
            <Typography variant="h6" color="white" mb={3}>
              اعداد الكاميرات وانواعها{" "}
            </Typography>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="standard"
                  fullWidth
                  sx={{ borderBottom: "1px solid lightblue" }}
                  name="indoor_cameras"
                  label="عدد الكاميرات الداخلية"
                  value={formik.values.indoor_cameras}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.indoor_cameras &&
                  Boolean(formik.errors.indoor_cameras) && (
                    <Typography color={"error"}>
                      {formik.errors.indoor_cameras}
                    </Typography>
                  )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="standard"
                  fullWidth
                  sx={{ borderBottom: "1px solid lightblue" }}
                  name="outdoor_cameras"
                  label="عدد الكاميرات الخارجية"
                  value={formik.values.outdoor_cameras}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.outdoor_cameras &&
                  Boolean(formik.errors.outdoor_cameras) && (
                    <Typography color={"error"}>
                      {formik.errors.outdoor_cameras}
                    </Typography>
                  )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="standard"
                  fullWidth
                  sx={{ borderBottom: "1px solid lightblue" }}
                  select
                  name="storage_device"
                  label="نوع وحدة التخزين"
                  value={formik.values.storage_device}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <MenuItem disabled>Select Storage Device Type</MenuItem>
                  <MenuItem value={"NVR"}>NVR</MenuItem>
                  <MenuItem value={"CCTV"}>CCTV</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="standard"
                  fullWidth
                  sx={{ borderBottom: "1px solid lightblue" }}
                  select
                  name="period_of_record"
                  label="مدة التسجيل"
                  value={formik.values.period_of_record}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <MenuItem disabled sx={{ direction: "rtl" }}>
                    اختر مدة التسجيل
                  </MenuItem>
                  {periods.map((e, index) => (
                    <MenuItem
                      key={index}
                      value={parseInt(e)}
                      sx={{ direction: "rtl" }}
                    >
                      {e}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="standard"
                  fullWidth
                  sx={{ borderBottom: "1px solid lightblue" }}
                  name="show_screens"
                  label="عدد شاشات العرض"
                  value={formik.values.show_screens}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.show_screens &&
                  Boolean(formik.errors.show_screens) && (
                    <Typography color={"error"}>
                      {formik.errors.show_screens}
                    </Typography>
                  )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="standard"
                  fullWidth
                  sx={{ borderBottom: "1px solid lightblue" }}
                  select
                  name="camera_type"
                  label="نوع الكاميرا"
                  value={formik.values.camera_type}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <MenuItem disabled>اختر نوع الكاميرا</MenuItem>
                  <MenuItem value={"EZVIZ"}>EZVIZ</MenuItem>
                  <MenuItem value={"Hikvision"}>Hikvision</MenuItem>
                  <MenuItem value={"Dahua"}>Dahua</MenuItem>
                </TextField>
              </Grid>
            </Grid>
            <Box
              borderTop={"2px solid white"}
              display={"flex"}
              justifyContent={"space-between"}
              mt={5}
              pt={5}
            >
              <Link href={"/ar/contract/personal-information"}>
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
                  الرجوع للخلف
                </Button>
              </Link>
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
                type="submit"
              >
                التقدم للأمام
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </Section>
  );
};

export default ContractProductDetails;
