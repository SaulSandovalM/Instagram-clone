import React, { useState } from "react";
import {
  Avatar,
  Button,
  FormControl,
  Grid,
  Input,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { db } from "../../Firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function EditProfile(props) {
  const [state, setState] = useState({
    image: props.user.user.image,
    name: props.user.user.name,
    userName: props.user.user.userName.toLowerCase(),
    bio: props.user.user.bio,
    email: props.user.user.email,
    phone: props.user.user.phone,
    gender: props.user.user.gender,
  });

  function handleChangeText(e) {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  }

  const updateUser = () => {
    const userRef = doc(db, "users", props.user.user.uid);
    updateDoc(userRef, {
      name: state.name,
      userName: state.userName,
      bio: state.bio,
      email: state.email,
      phone: state.phone,
      gender: state.gender,
      image:
        "https://scontent.flov1-1.fna.fbcdn.net/v/t39.30808-6/292274638_2223544677804834_4844359771652935425_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeF05SgLsVuWooEW1-oGg2dWYWaoXWLOwuRhZqhdYs7C5BHPrQ__31c1cCDJjWl_oLJrMwDPdjXnTT18QPSRWCjT&_nc_ohc=mOGkI6OvhwYAX_nw-gq&_nc_ht=scontent.flov1-1.fna&oh=00_AT_EXNsZsA9-TEV2K_iXUYN4b6yBmMj4yB3_7SuYtTCmNA&oe=635890F5",
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid
        item
        xs={3}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Avatar alt="Saul" src={state.image} />
      </Grid>
      <Grid item xs={8}>
        <Typography fontSize={20}>
          {props.user.user.userName.toLowerCase()}
        </Typography>
        <Typography fontSize={14}>Cambiar foto de perfil</Typography>
      </Grid>
      <Grid
        item
        xs={3}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Typography fontWeight={600}>Nombre</Typography>
      </Grid>
      <Grid item xs={8}>
        <Input
          value={props.user.user.name}
          disabled
          sx={{ background: "#EFEFEF", pr: 1, pl: 1 }}
          fullWidth
        />
      </Grid>
      <Grid
        item
        xs={3}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-start",
        }}
      >
        <Typography textAlign={"right"} fontWeight={600}>
          Nombre de usuario
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <Input
          name="userName"
          onChange={handleChangeText}
          value={state.userName}
          sx={{ pr: 1, pl: 1 }}
          fullWidth
        />
        <Typography fontSize={12} sx={{ mt: 2, color: "#8e8e8e" }}>
          En la mayoría de los casos, podrás volver a cambiar tu nombre de
          usuario a saulsandovalm durante 14 días más. Más información
        </Typography>
      </Grid>
      <Grid
        item
        xs={3}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-start",
        }}
      >
        <Typography textAlign={"right"} fontWeight={600}>
          Sitio web
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <Input
          value="Sitio web"
          sx={{ background: "#EFEFEF", pr: 1, pl: 1 }}
          disabled
          fullWidth
        />
        <Typography fontSize={12} sx={{ mt: 2, color: "#8e8e8e" }}>
          La edición de enlaces solo está disponible en dispositivos móviles.
          Visita la app de Instagram y edita tu perfil para cambiar los sitios
          web de tu presentación.
        </Typography>
      </Grid>
      <Grid
        item
        xs={3}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-start",
        }}
      >
        <Typography textAlign={"right"} fontWeight={600}>
          Presentación
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <Input
          multiline
          name="bio"
          value={state.bio}
          onChange={handleChangeText}
          rows={3}
          sx={{ pr: 1, pl: 1 }}
          fullWidth
        />
      </Grid>
      <Grid item xs={3} />
      <Grid item xs={8}>
        <Typography fontSize={13} fontWeight={600} sx={{ color: "#8e8e8e" }}>
          Información personal
        </Typography>
        <Typography fontSize={12} sx={{ mt: 1, color: "#8e8e8e" }}>
          Proporciona tu información personal, incluso si la cuenta se usa para
          un negocio, una mascota, etc. Esta información no se incluirá en tu
          perfil público.
        </Typography>
      </Grid>
      <Grid
        item
        xs={3}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-start",
        }}
      >
        <Typography textAlign={"right"} fontWeight={600}>
          Correo electrónico
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <Input
          name="email"
          value={state.email}
          onChange={handleChangeText}
          sx={{ pr: 1, pl: 1 }}
          fullWidth
        />
      </Grid>
      <Grid
        item
        xs={3}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-start",
        }}
      >
        <Typography textAlign={"right"} fontWeight={600}>
          Número de teléfono
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <Input
          name="phone"
          type="number"
          value={state.phone}
          onChange={handleChangeText}
          sx={{ pr: 1, pl: 1 }}
          fullWidth
        />
      </Grid>
      <Grid
        item
        xs={3}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-start",
        }}
      >
        <Typography textAlign={"right"} fontWeight={600}>
          Género
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <FormControl variant="standard" fullWidth>
          <Select
            name="gender"
            value={state.gender}
            onChange={handleChangeText}
          >
            <MenuItem value="Hombre">Hombre</MenuItem>
            <MenuItem value="Mujer">Mujer</MenuItem>
            <MenuItem value="Prefiero no contestar">
              Prefiero no contestar
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={3} />
      <Grid
        item
        xs={8}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          sx={{ textTransform: "none", background: "#0095F6", color: "white" }}
          onClick={updateUser}
        >
          Enviar
        </Button>
        <Typography fontSize={14} sx={{ color: "#0095F6" }}>
          Desactivar mi cuenta temporalmente
        </Typography>
      </Grid>
    </Grid>
  );
}
