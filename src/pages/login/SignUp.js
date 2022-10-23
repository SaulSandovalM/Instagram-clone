import React, { useState } from "react";
import {
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  FilledInput,
} from "@mui/material";
import app from "../../Firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import instagram from "../../assets/instagram.png";
import apple from "../../assets/apple.png";
import android from "../../assets/android.png";

const auth = getAuth(app);

export default function SignUp({ onChangeHeadline }) {
  const [state, setState] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let temp = {};
    const regex =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    temp.email = regex.test(state.email) ? "" : "No es un correo valido!";
    temp.password = state.password ? "" : "Campo requerido!";
    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    if (validate) {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const email = data.get("email");
      const password = data.get("password");
      signInWithEmailAndPassword(auth, email, password);
    }
  };

  const handleClickShowPassword = () => {
    setState({
      ...state,
      showPassword: !state.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value,
    });
  };

  return (
    <Grid container spacing={2}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Box>
            <Box
              sx={{
                border: "1px solid rgba(var(--b6a,219,219,219),1)",
                background: "white",
                width: 350,
                pt: 6,
                pb: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img src={instagram} alt="" />
              </Box>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ margin: "0 30px 10px" }}
              >
                <TextField
                  id="email"
                  label="Correo electrónico"
                  variant="filled"
                  fullWidth
                  size="small"
                  sx={{ mt: 2 }}
                  autoComplete="email"
                  name="email"
                  onChange={handleChange}
                  autoFocus
                  {...(errors.email && {
                    error: true,
                    helperText: errors.email,
                  })}
                />
                <FormControl sx={{ mt: 1 }} variant="filled">
                  <InputLabel>Contraseña</InputLabel>
                  <FilledInput
                    id="password"
                    size="small"
                    type={state.showPassword ? "text" : "password"}
                    name="password"
                    onChange={handleChange}
                    autoComplete="current-password"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {state.showPassword ? (
                            <Typography fontWeight={600} fontSize={14}>
                              Ocultar
                            </Typography>
                          ) : (
                            <Typography fontWeight={600} fontSize={14}>
                              Mostrar
                            </Typography>
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    {...(errors.password && {
                      error: true,
                      helperText: errors.password,
                    })}
                  />
                </FormControl>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ textTransform: "none", mt: 2 }}
                >
                  Iniciar sesion
                </Button>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 1,
                  }}
                >
                  <Divider sx={{ width: "42%" }} />
                  <Typography color="gray" fontWeight={500}>
                    o
                  </Typography>
                  <Divider sx={{ width: "42%" }} />
                </Box>
                <Typography fontSize={12} textAlign="center" sx={{ mt: 1 }}>
                  ¿Olvidaste tu contraseña?
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                border: "1px solid rgba(var(--b6a,219,219,219),1)",
                background: "white",
                width: 350,
                display: "flex",
                justifyContent: "center",
                pt: 3,
                pb: 3,
                mt: 1,
              }}
            >
              <Typography fontSize={14}>
                ¿No tienes una cuenta?{" "}
                <Link href="#" variant="body2" onClick={onChangeHeadline}>
                  Regístrate
                </Link>
              </Typography>
            </Box>
            <Box
              sx={{
                width: 350,
                display: "flex",
                justifyContent: "center",
                pt: 1,
                pb: 1,
                mt: 1,
              }}
            >
              <Typography fontSize={14}>Descarga la app</Typography>
            </Box>
            <Box
              sx={{
                width: 350,
                display: "flex",
                justifyContent: "center",
                pt: 1,
                pb: 1,
                mt: 1,
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <img src={apple} alt="" style={{ width: "40%" }} />
                <img src={android} alt="" style={{ width: "40%" }} />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Box>
    </Grid>
    // <Grid
    //   container
    //   spacing={2}
    //   sx={{
    //     backgroundSize: "cover",
    //     backgroundPosition: "center",
    //     height: "100vh",
    //   }}
    // >
    //   <Container
    //     component="main"
    //     maxWidth="xs"
    //     sx={{
    //       display: "flex",
    //       flexDirection: "column",
    //       justifyContent: "center",
    //     }}
    //   >
    //     <CssBaseline />
    //     <Box
    //       sx={{
    //         display: "flex",
    //         flexDirection: "column",
    //         alignItems: "center",
    //         bgcolor: "white",
    //         p: 3,
    //         borderRadius: 3,
    //       }}
    //     >
    //       <Box component="form" onSubmit={handleSubmit} noValidate>
    //         <Box sx={{ display: "flex", justifyContent: "center" }}></Box>
    //         <Typography align="center" fontSize={22} fontWeight="bold">
    //           Iniciar Sesión
    //         </Typography>
    //         <TextField
    //           margin="normal"
    //           required
    //           fullWidth
    //           id="email"
    //           label="Correo"
    //           name="email"
    //           autoComplete="email"
    //           type="email"
    //           autoFocus
    //         />
    //         <TextField
    //           margin="normal"
    //           required
    //           fullWidth
    //           name="password"
    //           label="Contraseña"
    //           type="password"
    //           id="password"
    //           autoComplete="current-password"
    //         />
    //         <Grid item xs textAlign="left" sx={{ mt: 2 }}>
    //           <Link href="#" variant="body2" sx={{ color: "gray" }}>
    //             Olvidaste tu contraseña?
    //           </Link>
    //         </Grid>
    //         <Button
    //           type="submit"
    //           fullWidth
    //           variant="contained"
    //           sx={{ mt: 3, mb: 2 }}
    //           size="large"
    //         >
    //           Iniciar sesión
    //         </Button>
    //         <Grid container direction="row" justifyContent="center">
    //           <Typography variant="subtitle2" sx={{ mr: 1 }}>
    //             No tienes una cuenta?
    //           </Typography>
    //           <Link
    //             href="#"
    //             variant="body2"
    //             onClick={onChangeHeadline}
    //             sx={{ ml: 1 }}
    //           >
    //             Registrar negocio
    //           </Link>
    //         </Grid>
    //       </Box>
    //     </Box>
    //   </Container>
    // </Grid>
  );
}
