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
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { savePersonalInformation } from "@/store/contractSlice";
import { useRouter } from "next/navigation";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const validationSchema = yup.object({
  name: yup.string().min(2, "الاسم قصير جدا").required("ادخل الاسم"),
  phone: yup
    .string()
    .matches(phoneRegExp, "رقم الجوال غير صالح")
    .required("ادخل رقم الجوال"),
  email: yup
    .string()
    .email("ادخل بريد الكتروني صالح")
    .required("ادخل البريد الالكتروني"),
  company_type: yup.string().required("ادخل نوع الشركة"),
  commercial_number: yup
    .string()
    .required("ادخل رقم السجل التجاري")
    .matches(/^[0-9]+$/, "ادخل رقم صالح")
    .length(10, "الرقم يجب ان يكون مكون 10 خانات"),
  tax_number: yup
    .string()
    .required("ادخل الرقم الضريبي")
    .matches(/^[0-9]+$/, "ادخل رقم صالح")
    .length(15, "الرقم يجب ان يكون مكون 15 خانة"),
  address: yup.string().required("ادخل العنوان"),
  city: yup.string().required("ادخل المدينة"),
  building_number: yup.string().required("ادخل رقم المبنى"),
  street_name: yup.string().required("ادخل اسم الشارع"),
  second_number: yup
    .string()
    .matches(phoneRegExp, "رقم الجوال غير صالح")
    .required("ادخل رقم الجوال"),
  district: yup.string().required("ادخل الحي"),
  zip_code: yup.string().required("ادخل الرمز البريدي"),
});

const ContractPersonalInformation = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  //
  const cities = [
    "ابها",
    "الاحساء",
    "عرعر",
    "بحا",
    "بريدة",
    "الدمام",
    "ظهران",
    "حفر الباطن",
    "حائل",
    "جدة",
    "جيزان",
    "خبر",
    "المدينة",
    "مكة",
    "نجف",
    "نجران",
    "القطيف",
    "رابغ",
    "الرياض",
    "سكاكة",
    "تبوك",
    "الطائف",
    "ينبع",
  ];

  const companyTypes = [
    "شركة تضامن",
    "شركة توصية بسيطة",
    "شركة مساهمة",
    "شركة مساهمة مبسطة",
    "شركة ذات مسئولية محدودة",
    "مؤسسة فردية",
  ];

  const personalInformation = useSelector(
    (state) => state.contract.personalInformation
  );
  const formik = useFormik({
    initialValues: personalInformation,
    validationSchema: validationSchema,
    onSubmit: (formData) => {
      dispatch(savePersonalInformation(formData));
      const personalInfo = Object.entries(formData);
      if (typeof window !== "undefined") {
        for (let i = 0; i < personalInfo.length; i++) {
          localStorage.setItem(personalInfo[i][0], personalInfo[i][1]);
        }
      }

      router.push("/product-details");
    },
  });

  return (
    <Section>
      <Container>
        <Box py={5} sx={{ direction: "rtl" }}>
          <form className="ar-form" onSubmit={formik.handleSubmit}>
            <Typography variant="h6" color="white" mb={3}>
              المعلومات الشخصية
            </Typography>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="standard"
                  fullWidth
                  sx={{ borderBottom: "1px solid lightblue" }}
                  name="name"
                  label="اسم الشخص او الشركة"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && Boolean(formik.errors.name) && (
                  <Typography color={"error"}>{formik.errors.name}</Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="standard"
                  fullWidth
                  sx={{ borderBottom: "1px solid lightblue" }}
                  name="phone"
                  label="رقم الجوال"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.phone && Boolean(formik.errors.phone) && (
                  <Typography color={"error"}>{formik.errors.phone}</Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="standard"
                  fullWidth
                  sx={{ borderBottom: "1px solid lightblue" }}
                  name="email"
                  label="البريد الالكتروني"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && Boolean(formik.errors.email) && (
                  <Typography color={"error"}>{formik.errors.email}</Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="standard"
                  fullWidth
                  sx={{ borderBottom: "1px solid lightblue" }}
                  select
                  name="company_type"
                  label="نوع الشركة"
                  type="text"
                  value={formik.values.company_type}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <MenuItem disabled value={"اختر نوع الشركة"}>
                    اختر نوع الشركة
                  </MenuItem>
                  {companyTypes.map((e, index) => (
                    <MenuItem key={index} value={e}>
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
                  name="commercial_number"
                  label="رقم السجل التجاري"
                  value={formik.values.commercial_number}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.commercial_number &&
                  Boolean(formik.errors.commercial_number) && (
                    <Typography color={"error"}>
                      {formik.errors.commercial_number}
                    </Typography>
                  )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="standard"
                  fullWidth
                  sx={{ borderBottom: "1px solid lightblue" }}
                  name="tax_number"
                  label="الرقم الضريبي"
                  value={formik.values.tax_number}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.tax_number &&
                  Boolean(formik.errors.tax_number) && (
                    <Typography color={"error"}>
                      {formik.errors.tax_number}
                    </Typography>
                  )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  fullWidth
                  sx={{ borderBottom: "1px solid lightblue" }}
                  name="address"
                  label="العنوان"
                  type="text"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.address && Boolean(formik.errors.address) && (
                  <Typography color={"error"}>
                    {formik.errors.address}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Typography variant="h6" color="white" my={3}>
              العنوان
            </Typography>
            {/* Address */}
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="standard"
                  fullWidth
                  sx={{ borderBottom: "1px solid lightblue" }}
                  select
                  name="city"
                  label="المدينة"
                  type="text"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <MenuItem disabled value={"اختر المدينة"}>
                    اختر المدينة
                  </MenuItem>
                  {cities.map((e, index) => (
                    <MenuItem key={index} value={e}>
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
                  name="building_number"
                  label="رقم المبنى"
                  value={formik.values.building_number}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.building_number &&
                  Boolean(formik.errors.building_number) && (
                    <Typography color={"error"}>
                      {formik.errors.building_number}
                    </Typography>
                  )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="standard"
                  fullWidth
                  sx={{ borderBottom: "1px solid lightblue" }}
                  name="street_name"
                  label="الشارع"
                  type="text"
                  value={formik.values.street_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.street_name &&
                  Boolean(formik.errors.street_name) && (
                    <Typography color={"error"}>
                      {formik.errors.street_name}
                    </Typography>
                  )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="standard"
                  fullWidth
                  sx={{ borderBottom: "1px solid lightblue" }}
                  name="second_number"
                  label="رقم جوال آخر"
                  value={formik.values.second_number}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.second_number &&
                  Boolean(formik.errors.second_number) && (
                    <Typography color={"error"}>
                      {formik.errors.second_number}
                    </Typography>
                  )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="standard"
                  fullWidth
                  sx={{ borderBottom: "1px solid lightblue" }}
                  name="district"
                  label="الحي"
                  type="text"
                  value={formik.values.district}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.district && Boolean(formik.errors.district) && (
                  <Typography color={"error"}>
                    {formik.errors.district}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="standard"
                  fullWidth
                  sx={{ borderBottom: "1px solid lightblue" }}
                  name="zip_code"
                  label="الرمز البريدي"
                  value={formik.values.zip_code}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.zip_code && Boolean(formik.errors.zip_code) && (
                  <Typography color={"error"}>
                    {formik.errors.zip_code}
                  </Typography>
                )}
              </Grid>
            </Grid>

            <Box
              borderTop={"2px solid white"}
              display={"flex"}
              justifyContent={"space-between"}
              mt={5}
              pt={5}
            >
              <Link href={"/ar/contract"}>
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
                type="submit"
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
            </Box>
          </form>
        </Box>
      </Container>
    </Section>
  );
};

export default ContractPersonalInformation;
