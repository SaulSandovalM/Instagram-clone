import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, Grid, Hidden, Typography } from "@mui/material";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../Firebase";
import PostCard from "../../components/PostCard";

export default function Home(props) {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, orderBy("created_at", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const posts = [];
        snapshot.forEach((doc) => {
          posts.push({
            userImage: doc.data().userImage,
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
        setPublications(posts);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => unsubscribe();
  }, []);

  return (
    <Grid container spacing={3} sx={{ mt: 1 }}>
      <Grid
        item
        xs={12}
        md={12}
        lg={7}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container>
          <Grid item xs={12}>
            {publications.map((post, id) => (
              <PostCard
                key={id}
                post={post}
                userName={props.user.userName}
                userImage={props.user.userImage}
                uid={props.user.uid}
              />
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Hidden lgDown>
        <Grid
          item
          lg={5}
          sx={{
            display: "flex",
            justifyContent: "flex-star",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 1,
            }}
          >
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 56, height: 56 }}
            />
            <Box>
              <Typography
                sx={{
                  textTransform: "lowercase",
                  fontSize: 14,
                  color: "#262626",
                }}
              >
                {props.user.userName}
              </Typography>
              <Typography sx={{ fontSize: 14, color: "#8e8e8e" }}>
                {props.user.name}
              </Typography>
            </Box>
            <Box>
              <Button
                size="small"
                variant="text"
                sx={{ textTransform: "none" }}
              >
                <b>Publicar</b>
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              p: 1,
              display: " flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography fontWeight={600} color="#8e8e8e" fontSize={14}>
              Sugerencias para ti
            </Typography>
            <Button
              variant="text"
              fontWeight={600}
              size="small"
              sx={{ textTransform: "none", color: "black" }}
            >
              Ver todo
            </Button>
          </Box>
          {/* <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 32, height: 32, marginRight: 1.5 }}
              />
              <Box>
                <Typography
                  sx={{
                    textTransform: "lowercase",
                    fontSize: 14,
                    color: "#262626",
                  }}
                >
                  {user.user.user.userName}
                </Typography>
                <Typography sx={{ fontSize: 12, color: "#8e8e8e" }}>
                  {user.user.user.name}
                </Typography>
              </Box>
            </Box>
            <Box>
              <Button
                size="small"
                variant="text"
                sx={{ textTransform: "none" }}
              >
                <b>Seguir</b>
              </Button>
            </Box>
          </Box> */}
        </Grid>
      </Hidden>
    </Grid>
  );
}
