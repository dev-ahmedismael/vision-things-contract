"use client";
import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";

const SOS = ({ children }) => {
  const scrollRef = useRef(null);
  return (
    <div ref={scrollRef}>
      <motion.div
        variants={{ offscreen: { opacity: 0 }, onscreen: { opacity: 1 } }}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: false }}
        transition={{ duration: 0.7 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default SOS;
