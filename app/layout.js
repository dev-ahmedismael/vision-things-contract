import ContractSteps from "@/contract/ContractSteps";
import React from "react";
import "./globals.css";
import { Nunito } from "next/font/google";
import ReduxProvider from "@/store/ReduxProvider";
import { Box } from "@mui/material";

const nunito = Nunito({ weight: "700", subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <title>Vision Things</title>
        <meta property="og:title" content="Vision Things" />
        <meta
          property="og:description"
          content="A Saudi company working in the field of technology and information
          through using of AI (artificial intelligence) technologies, computer vision,
          the use of robots, the provision of AR (augmented reality) experience,
          data science, the acquisition of outputs through certain procedures
          that created according to the workflow, the installation of networking
          and communications services, camera monitoring systems and the provision
          of Cyber security services."
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Vision Things" />
        <meta property="og:url" content="https://www.vision-things.com" />
        <meta property="og:image" content="/images/logo.png" />
        <meta
          name="description"
          content="A Saudi company working in the field of technology and information
          through using of AI (artificial intelligence) technologies, computer vision,
          the use of robots, the provision of AR (augmented reality) experience,
          data science, the acquisition of outputs through certain procedures
          that created according to the workflow, the installation of networking
          and communications services, camera monitoring systems and the provision
          of Cyber security services."
        />
      </head>
      <body className={nunito.className}>
        <ReduxProvider>
          <Box pt={5}>
            <ContractSteps />
            {children}
          </Box>
        </ReduxProvider>
      </body>
    </html>
  );
}
