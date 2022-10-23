import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../Firebase";
import Comments from "../../components/Comments";
import { Link } from "react-router-dom";

export default function Profile(props) {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [listComments, setListComments] = useState([]);
  const [selectedPost, setSelectedPost] = useState({
    userName: "",
    likes: [],
  });

  useEffect(() => {
    const collectionRef = collection(db, "posts");
    const q = query(
      collectionRef,
      where("userName", "==", props.user.userName)
    );
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const posts = [];
        snapshot.forEach((doc) => {
          posts.push({
            userName: doc.data().userName,
            location: doc.data().location,
            image: doc.data().image,
            likes: doc.data().likes,
            comments: doc.data().comments,
            description: doc.data().description,
            created_at: doc.data().created_at,
            id: doc.id,
          });
        });
        setPosts(posts);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => unsubscribe();
  }, [props.user.userName]);

  const handleClickOpen = (id, item) => {
    setSelectedPost(item);
    const collectionRef = collection(db, "posts/" + id + "/comments/");
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
    setOpen(true);
    return () => unsubscribe();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Box sx={{ p: 6 }}>
          <Avatar
            alt="Remy Sharp"
            src={props.user.image}
            sx={{ height: 150, width: 150 }}
          />
        </Box>
      </Grid>
      <Grid item xs={9}>
        <Box sx={{ pt: 6, pr: 6, pl: 6 }}>
          <Box sx={{ display: "flex" }}>
            <Typography fontSize={26} mr={2} lineHeight={1}>
              {props.user.userName.toLowerCase()}
            </Typography>
            <Link
              to="/editarperfil"
              style={{ textDecoration: "none", color: "black" }}
            >
              Editar perfil
            </Link>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Typography sx={{ mr: 5 }}>
              <b>{posts.length}</b> publicaciones
            </Typography>
            <Typography sx={{ mr: 5 }}>seguidores</Typography>
            <Typography>seguidos</Typography>
          </Box>
        </Box>
        <Box sx={{ pr: 6, pl: 6, pt: 3 }}>
          <Typography fontWeight={600}>{props.user.name}</Typography>
          <Typography>{props.user.bio}</Typography>
        </Box>
      </Grid>
      <Divider sx={{ width: "100%" }} />
      {posts.map((item) => (
        <Grid item xs={4} key={item.id}>
          <Card sx={{ maxWidth: 300 }}>
            <CardActionArea onClick={() => handleClickOpen(item.id, item)}>
              <CardMedia
                component="img"
                height="300"
                image={item.image}
                alt="Paella dish"
              />
            </CardActionArea>
          </Card>
        </Grid>
      ))}
      <Comments
        open={open}
        onClose={handleClose}
        post={selectedPost}
        uid={props.user.uid}
        userName={props.user.userName}
        listComments={listComments}
      />
    </Grid>
  );
}
