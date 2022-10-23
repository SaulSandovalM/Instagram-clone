import React, { useState } from "react";
import app from "../../Firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import {
  Box,
  Button,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import instagram from "../../assets/instagram.png";
import apple from "../../assets/apple.png";
import android from "../../assets/android.png";

const auth = getAuth(app);
const firestore = getFirestore(app);

export default function SignIn({ onChangeHeadline }) {
  const [state, setState] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value,
    });
  };

  async function handleRegister(name, email, password, userName) {
    const infoUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((userFirebase) => {
      return userFirebase;
    });
    const docRef = doc(firestore, `users/${infoUser.user.uid}`);
    setDoc(docRef, { email: email, name: name, userName: userName });
  }

  const validate = () => {
    let temp = {};
    const regex =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    temp.email = regex.test(state.email) ? "" : "No es un correo valido!";
    temp.name = state.name ? "" : "Este campo es requerido!";
    temp.userName = state.userName ? "" : "Este campo es requerido!";
    temp.password = state.password ? "" : "Minimo 6 caracteres!";
    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const name = state.name;
      const email = state.email;
      const password = state.password;
      const userName = state.userName.toLowerCase();
      handleRegister(name, email, password, userName);
    } else {
      console.log("info");
    }
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
                pb: 6,
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
              <Box sx={{ margin: "0 30px 10px" }}>
                <Typography
                  sx={{
                    color: "rgba(var(--f52,142,142,142),1)",
                    fontSize: 17,
                    fontWeight: 600,
                    lineHeight: 1,
                    textAlign: "center",
                  }}
                >
                  Regístrate para ver fotos y videos de tus amigos.
                </Typography>
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
                <TextField
                  label="Correo electrónico"
                  variant="filled"
                  fullWidth
                  size="small"
                  sx={{ mt: 2 }}
                  name="email"
                  value={state.email}
                  onChange={handleChange}
                  {...(errors.email && {
                    error: true,
                    helperText: errors.email,
                  })}
                />
                <TextField
                  label="Nombre completo"
                  variant="filled"
                  fullWidth
                  size="small"
                  sx={{ mt: 1 }}
                  name="name"
                  value={state.name}
                  onChange={handleChange}
                  {...(errors.name && { error: true, helperText: errors.name })}
                />
                <TextField
                  label="Nombre de usuario"
                  variant="filled"
                  fullWidth
                  size="small"
                  sx={{ mt: 1 }}
                  name="userName"
                  value={state.userName}
                  onChange={handleChange}
                  {...(errors.userName && {
                    error: true,
                    helperText: errors.userName,
                  })}
                />
                <TextField
                  type="password"
                  label="Contraseña"
                  variant="filled"
                  fullWidth
                  size="small"
                  sx={{ mt: 1 }}
                  name="password"
                  value={state.password}
                  onChange={handleChange}
                  {...(errors.password && {
                    error: true,
                    helperText: errors.password,
                  })}
                />
                <Typography
                  fontSize={12}
                  textAlign="center"
                  mt={2}
                  color={"gray"}
                >
                  Es posible que las personas que usan nuestro servicio hayan
                  subido tu información de contacto a Instagram.{" "}
                  <b>Más información</b>
                  <br />
                  <br />
                  Al registrarte, aceptas nuestras <b>Condiciones</b>, la{" "}
                  <b>Política de privacidad</b> y la <b>Política de cookies</b>
                </Typography>
                <Button
                  sx={{ textTransform: "none", mt: 2 }}
                  variant="contained"
                  fullWidth
                  onClick={handleSubmit}
                >
                  Registrate
                </Button>
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
                ¿Tienes una cuenta?{" "}
                <Link href="#" variant="body2" onClick={onChangeHeadline}>
                  Inicia Sesion
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
  );
}
