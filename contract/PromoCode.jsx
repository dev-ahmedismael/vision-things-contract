"use client";
import { applyDiscount, setDiscount } from "@/store/contractSlice";
import SOS from "@/templates/SOS";
import { Alert, Box, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import urlsList from "@/public/data/urlsList.json";

const PromoCode = () => {
  const promoRef = useRef();
  const dispatch = useDispatch();
  const url = urlsList.promo_codes;
  const [promocodes, setPromoCodes] = useState([]);
  useEffect(() => {
    axios.get(url).then((res) => setPromoCodes(res.data));
    if (typeof window !== "undefined") {
      localStorage.setItem("discount", 0);
    }
  }, []);

  const [startDate, setStartDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [promoResMsg, setPromoResMsg] = useState(null);

  const checkDiscount = () => {
    const foundPromoCode = promocodes.find(
      (code) => code.promocode === promoRef.current.value
    );

    if (foundPromoCode) {
      setStartDate(Date.parse(foundPromoCode.start_date));
      setExpiryDate(Date.parse(foundPromoCode.expiry_date));
      const currentDate = new Date();
      if (currentDate > expiryDate) {
        setPromoResMsg(
          `تهانينا، لقد حصلت على خصم بقيمة ${foundPromoCode.discount}%`
        );
        dispatch(applyDiscount(foundPromoCode.discount / 100));
        dispatch(setDiscount(foundPromoCode?.discount));
        if (typeof window !== "undefined") {
          localStorage.setItem("discount", foundPromoCode?.discount);
        }
      } else {
        setPromoResMsg("كوبون الخصم الذي ادخلته منتهى الصلاحية");
      }
    } else {
      setPromoResMsg("كوبون الخصم الذي ادخلته غير صحيح");
    }
  };

  return (
    <SOS>
      <Container>
        <Box bgcolor={"#0c1933"} borderRadius={5}>
          <Container>
            <Box py={3}>
              <Typography variant="h5" color={"white"} mb={3}>
                كود الخصم
              </Typography>
              <Box className="contract-form" mb={3}>
                <input
                  ref={promoRef}
                  name="promo_code"
                  placeholder="كود الخصم"
                  type="text"
                />
              </Box>
              <Button
                variant="contained"
                sx={{
                  backgroundImage: "linear-gradient(to right,#21C8F6,#637BFF)",
                  width: "100%",
                  height: 60,
                  borderRadius: 2,
                  px: 5,
                }}
                onClick={checkDiscount}
              >
                اتمام
              </Button>
              {promoResMsg !== null && (
                <Box py={3}>
                  <Alert
                    severity={
                      promoResMsg === "كوبون الخصم الذي ادخلته غير صحيح"
                        ? "error"
                        : promoResMsg ===
                          "كوبون الخصم الذي ادخلته منتهى الصلاحية"
                        ? "warning"
                        : "success"
                    }
                  >
                    {promoResMsg}
                  </Alert>
                </Box>
              )}
            </Box>
          </Container>
        </Box>
      </Container>
    </SOS>
  );
};

export default PromoCode;
