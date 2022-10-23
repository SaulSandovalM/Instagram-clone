import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../Firebase";
import Comments from "./Comments";

export default function PostCard({ id, post, userName, uid }) {
  const [comment, setComment] = useState("");
  const [listComments, setListComments] = useState([]);
  const [open, setOpen] = useState(false);

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
      handleClose();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  useEffect(() => {
    const collectionRef = collection(db, "posts/" + post.id + "/comments/");
    const q = query(collectionRef, orderBy("created_at", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const comments = [];
        snapshot.forEach((doc) => {
          comments.push({
            userName: doc.data().userName,
            created_at: doc.data().created_at,
            likes: doc.data().likes,
            comment: doc.data().comment,
            id: doc.id,
          });
        });
        setListComments(comments);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => unsubscribe();
  }, [post.id]);

  return (
    <Card key={id} sx={{ mt: 2 }}>
      <CardHeader
        avatar={<Avatar sx={{ height: 32, width: 32 }} src={post.userImage} />}
        action={
          <IconButton aria-label="settings">
            <MoreHorizOutlinedIcon sx={{ color: "black" }} />
          </IconButton>
        }
        title={userName.toLowerCase()}
        subheader={post.location}
      />
      <CardMedia
        component="img"
        height="470"
        image={post.image}
        alt="Paella dish"
      />
      <CardActions
        disableSpacing
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Box>
          <IconButton onClick={() => handleLike(post.id)}>
            {post.likes?.includes(uid) ? (
              <FavoriteIcon sx={{ color: "red" }} />
            ) : (
              <FavoriteBorderOutlinedIcon sx={{ color: "black" }} />
            )}
          </IconButton>
          <IconButton>
            <ChatBubbleOutlineOutlinedIcon sx={{ color: "black" }} />
          </IconButton>
          <IconButton>
            <SendOutlinedIcon sx={{ color: "black" }} />
          </IconButton>
        </Box>
        <Box>
          <IconButton>
            <BookmarkBorderOutlinedIcon sx={{ color: "black" }} />
          </IconButton>
        </Box>
      </CardActions>
      <CardContent sx={{ mt: -3 }}>
        {post.likes.length !== 0 ? (
          <Typography color="black" fontWeight={600} fontSize={14}>
            {post.likes.length} Me gusta
          </Typography>
        ) : null}
        <Typography color="black" fontSize={14}>
          <b>{userName.toLowerCase()}</b> {post.description}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1 }}
          onClick={handleClickOpen}
        >
          Ver los {listComments.length} cometarios
        </Typography>
        <Comments
          open={open}
          onClose={handleClose}
          post={post}
          uid={uid}
          userName={userName}
          listComments={listComments}
        />
        {/* <Typography
      fontSize={10}
      sx={{ mt: 1 }}
      color="text.secondary"
    >
      HACE{" "}
      {new Date().getHours() -
        new Date(item.updated_at).getHours()}{" "}
      HORAS
    </Typography> */}
      </CardContent>
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
  );
}
