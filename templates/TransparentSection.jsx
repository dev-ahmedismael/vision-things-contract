import React from "react";

const TransparentSection = (text, imgUrl) => {
  return (
    <section>
      <Container>
        <Box py={5}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <Box>{text}</Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <img
                  src={imgUrl}
                  alt="Section Picture"
                  width={"100%"}
                  height={500}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </section>
  );
};

export default TransparentSection;
