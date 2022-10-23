import React, { useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import EditProfile from "./EditProfile";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ width: "100%" }}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function EditContainer(props) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: "100%",
        width: "100%",
        mt: 5,
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab
          label="Editar perfil"
          {...a11yProps(0)}
          sx={{
            textTransform: "none",
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "row",
            textAlign: "left",
          }}
        />
        <Tab
          label="Cuenta profesional"
          {...a11yProps(1)}
          sx={{
            textTransform: "none",
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "row",
            textAlign: "left",
          }}
        />
        <Tab
          label="Cambiar contraseña"
          {...a11yProps(2)}
          sx={{
            textTransform: "none",
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "row",
            textAlign: "left",
          }}
        />
        <Tab
          label="Apps y sitios web"
          {...a11yProps(3)}
          sx={{
            textTransform: "none",
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "row",
            textAlign: "left",
          }}
        />
        <Tab
          label="Notificaciones por correo electronico"
          {...a11yProps(4)}
          sx={{
            textTransform: "none",
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "row",
            textAlign: "left",
          }}
        />
        <Tab
          label="Notificacion push"
          {...a11yProps(5)}
          sx={{
            textTransform: "none",
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "row",
            textAlign: "left",
          }}
        />
        <Tab
          label="Administrar contratos"
          {...a11yProps(6)}
          sx={{
            textTransform: "none",
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "row",
            textAlign: "left",
          }}
        />
        <Tab
          label="Privacidad y seguridad"
          {...a11yProps(7)}
          sx={{
            textTransform: "none",
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "row",
            textAlign: "left",
          }}
        />
        <Tab
          label="Supervision"
          {...a11yProps(8)}
          sx={{
            textTransform: "none",
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "row",
            textAlign: "left",
          }}
        />
        <Tab
          label="Actividad de inicio de sesion"
          {...a11yProps(9)}
          sx={{
            textTransform: "none",
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "row",
            textAlign: "left",
          }}
        />
        <Tab
          label="Correos electronicos de Instagram"
          {...a11yProps(10)}
          sx={{
            textTransform: "none",
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "row",
            textAlign: "left",
          }}
        />
        <Tab
          label="Ayuda"
          {...a11yProps(11)}
          sx={{
            textTransform: "none",
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "row",
            textAlign: "left",
          }}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <EditProfile user={props} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
      <TabPanel value={value} index={7}>
        Item Eight
      </TabPanel>
      <TabPanel value={value} index={8}>
        Item Nine
      </TabPanel>
      <TabPanel value={value} index={9}>
        Item Ten
      </TabPanel>
      <TabPanel value={value} index={10}>
        Item Eleven
      </TabPanel>
      <TabPanel value={value} index={11}>
        Item Twelve
      </TabPanel>
    </Box>
  );
}
