"use client";
import Section from "@/templates/Section";
import { Alert, Box, Button, Container, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PromoCode from "./PromoCode";
import ContractPrice from "./ContractPrice";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import urlsList from "@/public/data/urlsList";

const validationSchema = yup.object({
  credit_card_owner_name: yup
    .string()
    .min(4, "الاسم قصير جدا")
    .required("الاسم مطلوب"),

  credit_card_number: yup
    .string()
    .required("ادخل رقم البطاقة")
    .matches(/^[0-9]+$/, "ادخل رقم بطاقة صالح")
    .min(14, "رقم البطاقة لا يمكن أن يكون أقل من 14 رقم"),
  cvv: yup
    .string()
    .required("ادخل الرقم المكون من ثلاثة أرقام على ظهر البطاقة")
    .matches(/^[0-9]+$/, "ادخل رقم بطاقة صالح")
    .min(3, "الرقم لا يمكن أن يكون أقل من ثلاثة أرقام")
    .max(3, "الرقم لا يمكن أن يكون أكثر من ثلاثة أرقام"),
  expiry_date: yup.date().required("ادخل تاريخ انتهاء البطاقة"),
});

const ContractPayment = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [errMsg, setErrMsg] = useState(null);

  const formik = useFormik({
    initialValues: {
      credit_card_owner_name: "",
      credit_card_number: "",
      cvv: "",
      expiry_date: "",
    },
    validationSchema: validationSchema,
    onSubmit: (formData) => {
      // dispatch(savePaymentDetails(formData));
      // router.push("/ar/contract/final-contract");
      sendPayment();
    },
  });

  // Send payment
  const url = "https://api.moyasar.com/v1/payments";

  const token = "pk_live_3oEm9EZqLmQ2b7LuCwrHa4eWTV7ySnGBKPY8hLkJ";

  const data = {
    amount: 100,
    currency: "SAR",
    description: "Payment for order #",
    callback_url: "https://www.vision-things.com/ar/payment-redirect",
    source: {
      type: "creditcard",
      methods: ["creditcard"],
      supported_networks: ["mada"],
      name: formik.values.credit_card_owner_name,
      number: formik.values.credit_card_number,
      cvc: formik.values.cvv,
      month: formik.values.expiry_date.slice(0, 2),
      year: formik.values.expiry_date.slice(-2),
    },
  };

  const personalInformation = useSelector(
    (state) => state.contract.personalInformation
  );

  useEffect(() => {
    axios
      .get(urlsList.contract_number)
      .then((res) => {
        if (typeof window !== "undefined") {
          localStorage.setItem("contract_number", res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const sendPayment = () => {
    axios
      .post(url, data, {
        auth: {
          username: token,
          password: "",
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
      .catch((error) => {
        setErrMsg(error.response.data.message);
        axios
          .post(
            urlsList.failed_payments,
            {
              name: personalInformation.name,
              phone: personalInformation.phone,
              email: personalInformation.email,
            },
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Accept: "application/json",
              },
            }
          )
          .catch((err) => {
            console.log(err);
          });
      });
  };

  return (
    <>
      <Container>
        <Box py={5} sx={{ direction: "rtl" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={7}>
              <Section>
                <Container>
                  <Box py={5}>
                    <Typography variant="h5" color={"white"} mb={3}>
                      تفاصيل الدفع
                    </Typography>
                    <form
                      className="contract-form mysr-form"
                      onSubmit={formik.handleSubmit}
                    >
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <input
                            name="credit_card_owner_name"
                            placeholder="اسم حامل البطاقة"
                            type="text"
                            value={formik.values.credit_card_owner_name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.credit_card_owner_name &&
                            Boolean(formik.errors.credit_card_owner_name) && (
                              <Typography color={"error"}>
                                {formik.errors.credit_card_owner_name}
                              </Typography>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                          <input
                            name="credit_card_number"
                            placeholder="رقم بطاقة الدفع"
                            value={formik.values.credit_card_number}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.credit_card_number &&
                            Boolean(formik.errors.credit_card_number) && (
                              <Typography color={"error"}>
                                {formik.errors.credit_card_number}
                              </Typography>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <input
                            name="cvv"
                            placeholder="CVV"
                            value={formik.values.cvv}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.cvv && Boolean(formik.errors.cvv) && (
                            <Typography color={"error"}>
                              {formik.errors.cvv}
                            </Typography>
                          )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <input
                            name="expiry_date"
                            placeholder="تاريخ الانتهاء"
                            value={formik.values.expiry_date}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />

                          {formik.touched.expiry_date &&
                            Boolean(formik.errors.expiry_date) && (
                              <Typography color={"error"}>
                                {formik.errors.expiry_date}
                              </Typography>
                            )}
                        </Grid>
                        {errMsg !== null && (
                          <Grid item xs={12}>
                            <Alert severity="error">{errMsg}</Alert>
                          </Grid>
                        )}
                      </Grid>

                      <Box
                        borderTop={"2px solid white"}
                        display={"flex"}
                        justifyContent={"space-between"}
                        mt={5}
                        pt={5}
                      >
                        <Link href={"/ar/contract/product-details"}>
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
                          type="submit"
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
                          الدفع
                        </Button>
                      </Box>
                    </form>
                  </Box>
                </Container>
              </Section>
            </Grid>
            <Grid item xs={12} sm={5}>
              <ContractPrice />
              <PromoCode />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default ContractPayment;
