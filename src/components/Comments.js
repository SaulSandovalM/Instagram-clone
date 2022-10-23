import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Dialog,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../Firebase";

export default function Comments(props) {
  const { onClose, open, post, uid, userName, listComments } = props;
  const [comment, setComment] = useState("");

  const handleClose = () => {
    onClose(false);
  };

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  function handleSubmit(id) {
    try {
      addDoc(collection(db, "posts/" + id + "/comments"), {
        user: uid,
        userName: userName,
        comment: comment,
        likes: [],
        created_at: Date.now(),
      });
      console.log("Document written");
      setComment("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const handleLike = (id) => {
    if (post.likes?.includes(uid)) {
      updateDoc(doc(db, "posts/" + id), {
        likes: arrayRemove(uid),
      })
        .then(() => {
          console.log("unliked");
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      updateDoc(doc(db, "posts/" + id), {
        likes: arrayUnion(uid),
      })
        .then(() => {
          console.log("liked");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const handleLikeComment = (id) => {
    const newList = [];
    listComments.map((item) => (item.id === id ? newList.push(item) : null));
    if (newList[0].likes?.includes(uid)) {
      updateDoc(doc(db, "posts/" + post.id + "/comments/" + id), {
        likes: arrayRemove(uid),
      })
        .then(() => {
          console.log("unliked");
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      updateDoc(doc(db, "posts/" + post.id + "/comments/" + id), {
        likes: arrayUnion(uid),
      })
        .then(() => {
          console.log("liked");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="lg" fullWidth={true}>
      <Grid container>
        <Grid item xs={12} md={8} lg={8}>
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
              src={post.image}
              alt={post.image}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Card
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
              height: 750,
            }}
          >
            <CardHeader
              avatar={<Avatar sx={{ width: 32, height: 32 }}>R</Avatar>}
              action={
                <IconButton>
                  <MoreHorizIcon />
                </IconButton>
              }
              title={post.userName.toLowerCase()}
              subheader={post.location}
              subheaderTypographyProps={{
                fontSize: 12,
                color: "black",
              }}
            />
            <Divider sx={{ width: "100%" }} />
            <Box
              sx={{
                flex: 1,
                overflowY: "scroll",
                "&::-webkit-scrollbar": {
                  width: 0,
                },
              }}
            >
              <CardHeader
                avatar={<Avatar sx={{ width: 32, height: 32 }}>R</Avatar>}
                title={post.userName.toLowerCase() + " " + post.description}
                subheader="Ver traducción"
                subheaderTypographyProps={{
                  fontSize: 12,
                  color: "gray",
                }}
              />
              {listComments.map((item) => (
                <CardHeader
                  key={item.id}
                  avatar={
                    <Avatar
                      alt={item.userName}
                      sx={{ width: 32, height: 32 }}
                      src={item.image}
                    />
                  }
                  action={
                    <IconButton onClick={() => handleLikeComment(item.id)}>
                      {item.likes?.includes(uid) ? (
                        <FavoriteIcon fontSize="small" sx={{ color: "red" }} />
                      ) : (
                        <FavoriteBorderOutlinedIcon
                          fontSize="small"
                          sx={{ color: "gray" }}
                        />
                      )}
                    </IconButton>
                  }
                  title={item.userName.toLowerCase() + " " + item.comment}
                  subheader={
                    item.likes.length !== 0
                      ? `${item.likes.length} Me gusta`
                      : "Ver traducción"
                  }
                  subheaderTypographyProps={{
                    fontSize: 12,
                    color: "gray",
                  }}
                />
              ))}
            </Box>
            <Divider sx={{ width: "100%" }} />
            <CardActions disableSpacing>
              <Box
                sx={{
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <IconButton onClick={() => handleLike(post.id)}>
                      {post.likes?.includes(uid) ? (
                        <FavoriteIcon sx={{ color: "red" }} />
                      ) : (
                        <FavoriteBorderOutlinedIcon sx={{ color: "gray" }} />
                      )}
                    </IconButton>
                    <IconButton>
                      <ChatBubbleOutlineOutlinedIcon sx={{ color: "gray" }} />
                    </IconButton>
                    <IconButton>
                      <SendOutlinedIcon sx={{ color: "gray" }} />
                    </IconButton>
                  </Box>
                  <IconButton>
                    <BookmarkBorderOutlinedIcon sx={{ color: "gray" }} />
                  </IconButton>
                </Box>
                <Box sx={{ m: 1 }}>
                  {post.likes.length !== 0 ? (
                    <Typography variant="subtitle2" fontWeight={600}>
                      {post.likes.length} Me gusta
                    </Typography>
                  ) : null}
                </Box>
              </Box>
            </CardActions>
            <Divider sx={{ width: "100%" }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: 1.5,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <SentimentSatisfiedAltIcon />
              </Box>
              <InputBase
                placeholder="Agrega un comentario..."
                value={comment}
                onChange={handleChange}
                sx={{ ml: 1, flex: 1, fontSize: 14 }}
              />
              <Box>
                <Button
                  size="small"
                  variant="text"
                  sx={{ textTransform: "none" }}
                  onClick={() => handleSubmit(post.id)}
                  disabled={comment === ""}
                >
                  <b>Publicar</b>
                </Button>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Dialog>
  );
}
