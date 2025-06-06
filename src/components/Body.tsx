import { onAuthStateChanged } from "firebase/auth";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { useEffect } from "react";
import { Login } from "./Login";
import { Browse } from "./Browse";

import { auth } from "../config/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        // ...
      } else {
        // User is signed out
        // ...
        dispatch(removeUser());
      }
    });
  }, []);

  return <RouterProvider router={appRouter} />;
};

export default Body;
