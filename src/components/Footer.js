import React from "react";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function Footer() {
  return (
    <Grid container spacing={2}>
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <Typography fontSize={12} color="gray">
            Meta
          </Typography>
          <Typography fontSize={12} color="gray">
            Información
          </Typography>
          <Typography fontSize={12} color="gray">
            Blog
          </Typography>
          <Typography fontSize={12} color="gray">
            Empleo
          </Typography>
          <Typography fontSize={12} color="gray">
            Ayuda
          </Typography>
          <Typography fontSize={12} color="gray">
            API
          </Typography>
          <Typography fontSize={12} color="gray">
            Privacidad
          </Typography>
          <Typography fontSize={12} color="gray">
            Condiciones
          </Typography>
          <Typography fontSize={12} color="gray">
            Cuentas destacadas
          </Typography>
          <Typography fontSize={12} color="gray">
            Hastags
          </Typography>
          <Typography fontSize={12} color="gray">
            Ubicaciones
          </Typography>
          <Typography fontSize={12} color="gray">
            Instagram Lite
          </Typography>
          <Typography fontSize={12} color="gray">
            Subir contactos y no usuarios
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          m: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            width: "40%",
          }}
        >
          <Typography fontSize={12} color="gray">
            Danza
          </Typography>
          <Typography fontSize={12} color="gray">
            Comida y bebida
          </Typography>
          <Typography fontSize={12} color="gray">
            Casa y jardín
          </Typography>
          <Typography fontSize={12} color="gray">
            Música
          </Typography>
          <Typography fontSize={12} color="gray">
            Artes visuales
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Typography fontSize={12} color="gray">
          © 2022 Instagram from Meta
        </Typography>
      </Box>
    </Grid>
  );
}
