import React, { useContext, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import Create from "./Components/Create/Create";
import View from "./Components/View/View";

import Home from "./Pages/Home";
import firebase from "./firebase/config";
import { AuthContext } from "./store/Context";
import { getAuth } from "firebase/auth";
import {
  getDocs,
  collection,
  query,
  where,
  getFirestore,
} from "firebase/firestore";
import Post from "./store/postContext";

function App() {
  const { setUser } = useContext(AuthContext);
  const auth = getAuth(firebase);
  const firestore = getFirestore(firebase);
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      // console.log(user.uid);
      if (user) {
        const q = query(
          collection(firestore, "user"),
          where("id", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          console.log("User not found");
        } else {
          const user = querySnapshot.docs[0].data();
          // console.log(user);
          setUser(user);
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Post>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<Create />} />
          <Route path="/view" element={<View />} />
        </Routes>
      </Post>
    </div>
  );
}

export default App;
