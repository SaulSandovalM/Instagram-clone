import React, { useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Container,
  Menu,
  InputBase,
  MenuItem,
  IconButton,
  Badge,
  Box,
  Toolbar,
  AppBar,
  Avatar,
  Hidden,
  Divider,
  Dialog,
  DialogTitle,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import instagram from "../assets/instagram.png";
import {
  getStorage,
  ref as ref_storage,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../Firebase";
import { signOut } from "firebase/auth";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#efefef",
  "&:hover": {
    backgroundColor: "#efefef",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#8e8e8e",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Nav(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState();
  const [image, setImage] = useState(null);
  const [userName] = useState(props.user.userName);
  const [userImage] = useState(props.user.image);

  function uploadImage(image) {
    setImage(image);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link to="/perfil" style={{ textDecoration: "none", color: "black" }}>
        <MenuItem>Perfil</MenuItem>
      </Link>
      <Divider sx={{ width: "100%" }} />
      <MenuItem onClick={() => signOut(props.auth)}>Salir</MenuItem>
    </Menu>
  );

  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const description = data.get("description");
    const location = data.get("location");
    const storage = getStorage();
    /** @type {any} */
    const metadata = {
      contentType: "image/jpeg",
    };
    const storageRef = ref_storage(storage, `publications/` + image.name);
    const uploadTask = uploadBytesResumable(storageRef, image, metadata);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;
          case "storage/unknown":
            break;
          default:
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          try {
            addDoc(collection(db, "posts"), {
              userImage: userImage,
              userName: userName,
              location: location,
              image: downloadURL,
              description: description,
              likes: [],
              created_at: Date.now(),
            });
            console.log("Document written");
            setImage(null);
            handleClose();
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        });
      }
    );
  }

  function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
      onClose(selectedValue);
      setImage(null);
    };

    return (
      <Dialog maxWidth="lg" fullWidth={true} onClose={handleClose} open={open}>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <DialogTitle
            sx={{
              fontSize: 16,
              fontWeight: 600,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            Crea una nueva publicación
            <Button
              size="small"
              sx={{ textTransform: "none" }}
              disabled={image === null}
              type="submit"
            >
              Compartir
            </Button>
          </DialogTitle>
          <Divider sx={{ width: "100%" }} />
          <Grid container spacing={2}>
            <Grid item xs={12} md={8} lg={8}>
              {image === null ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    height: 750,
                  }}
                >
                  <AddPhotoAlternateOutlinedIcon
                    sx={{ width: 95, height: 95 }}
                  />
                  <Typography sx={{ mt: 1 }}>
                    Arrastra las fotos y los videos aquí
                  </Typography>
                  <Button
                    variant="contained"
                    component="label"
                    size="small"
                    sx={{ textTransform: "none", mt: 1 }}
                    onChange={(e) => {
                      uploadImage(e.target.files[0]);
                    }}
                  >
                    Seleccionar desde el dispositivo
                    <input hidden accept="image/*" multiple type="file" />
                  </Button>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 750,
                    width: "100%",
                  }}
                >
                  <Box
                    component="img"
                    sx={{ height: "100%", width: "100%", objectFit: "cover" }}
                    src={URL.createObjectURL(image)}
                    alt={image}
                  />
                </Box>
              )}
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    p: 1,
                  }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/1.jpg"
                    sx={{ width: 28, height: 28, mr: 1 }}
                  />
                  <Box>
                    <Typography
                      sx={{
                        textTransform: "lowercase",
                        fontSize: 16,
                        color: "#262626",
                        fontWeight: 600,
                      }}
                    >
                      {userName}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ width: "100%" }}>
                  <InputBase
                    placeholder="Escribe una descripción..."
                    multiline
                    sx={{ width: "100%", p: 1 }}
                    rows={6}
                    name="description"
                    id="description"
                  />
                </Box>
                <Divider sx={{ width: "100%" }} />
                <Box sx={{ width: "100%" }}>
                  <InputBase
                    placeholder="Agregar ubicación"
                    sx={{ width: "100%", p: 1 }}
                    endAdornment={<LocationOnOutlinedIcon />}
                    name="location"
                    id="location"
                  />
                </Box>
                <Divider sx={{ width: "100%" }} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar component="nav" sx={{ background: "white" }}>
        <Container maxWidth="md">
          <Toolbar>
            <Link to="/">
              <img src={instagram} alt="" style={{ height: "30px" }} />
            </Link>
            <Box sx={{ flexGrow: 1 }} />
            <Hidden smDown>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon sx={{ color: "#8e8e8e" }} />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Buscar"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Hidden>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton>
                <Badge>
                  {/* badgeContent={4} color="error" */}
                  <HomeOutlinedIcon sx={{ color: "black" }} />
                </Badge>
              </IconButton>
              <IconButton>
                <Badge>
                  {/* badgeContent={4} color="error" */}
                  <MessageOutlinedIcon sx={{ color: "black" }} />
                </Badge>
              </IconButton>
              <IconButton onClick={handleClickOpen}>
                <AddBoxOutlinedIcon sx={{ color: "black" }} />
              </IconButton>
              <IconButton>
                <Badge>
                  {/* badgeContent={4} color="error" */}
                  <ExploreOutlinedIcon sx={{ color: "black" }} />
                </Badge>
              </IconButton>
              <IconButton>
                <Badge>
                  {/* badgeContent={4} color="error" */}
                  <FavoriteBorderOutlinedIcon sx={{ color: "black" }} />
                </Badge>
              </IconButton>
              <IconButton onClick={handleProfileMenuOpen}>
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar/1.jpg"
                  sx={{ width: 24, height: 24 }}
                />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton>
                <Badge>
                  <AddBoxOutlinedIcon
                    onClick={handleClickOpen}
                    sx={{ color: "black" }}
                  />
                </Badge>
              </IconButton>
              <IconButton>
                <Badge>
                  {/* badgeContent={4} color="error" */}
                  <FavoriteBorderOutlinedIcon sx={{ color: "black" }} />
                </Badge>
              </IconButton>
              <IconButton>
                <Badge>
                  {/* badgeContent={4} color="error" */}
                  <MessageOutlinedIcon sx={{ color: "black" }} />
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {renderMenu}
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </Box>
  );
}
