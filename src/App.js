import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Toolbar, Container, Box, Hidden } from "@mui/material";
import Router from "./routes/Router";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import app from "./Firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Login from "./pages/login/Login";

const auth = getAuth(app);
const firestore = getFirestore(app);

export default function App() {
  const [user, setUser] = useState(null);

  async function getInfoUser(uid) {
    const docRef = doc(firestore, `users/${uid}`);
    const docSecret = await getDoc(docRef);
    const userName = docSecret.data().userName;
    const name = docSecret.data().name;
    const bio = docSecret.data().bio;
    const image = docSecret.data().image;
    const phone = docSecret.data().phone;
    const gender = docSecret.data().gender;
    const data = { name, userName, bio, image, phone, gender };
    return data;
  }

  function setUserWithFirebaseAndRole(firebaseUser) {
    getInfoUser(firebaseUser.uid).then((data) => {
      const userData = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        phone: data.phone,
        userName: data.userName,
        name: data.name,
        bio: data.bio,
        image: data.image,
        gender: data.gender,
      };
      setUser(userData);
    });
  }

  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      if (!user) {
        setUserWithFirebaseAndRole(firebaseUser);
      }
    } else {
      setUser(null);
    }
  });

  return (
    <div style={{ background: "#fafafa" }}>
      <BrowserRouter>
        {user ? (
          <Box>
            <Nav user={user} auth={auth} />
            <Toolbar />
            <Container maxWidth="md">
              <Router user={user} />
              <Toolbar />
              <Hidden smDown>
                <Footer />
              </Hidden>
            </Container>
          </Box>
        ) : (
          <Login />
        )}
      </BrowserRouter>
    </div>
  );
}
