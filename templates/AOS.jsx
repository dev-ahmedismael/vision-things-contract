"use client";
import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";

const AOS = ({ children }) => {
  const scrollRef = useRef(null);
  return (
    <div ref={scrollRef} style={{ overflow: "hidden" }}>
      <motion.div
        variants={{ offscreen: { y: 300 }, onscreen: { y: 0 } }}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default AOS;
