import { onAuthStateChanged } from "firebase/auth";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { useEffect } from "react";
import { Browse } from "./Browse";

import { auth } from "../config/firebase";
import { useAppDispatch } from "../customHooks/reduxHooks";
import {
  addUser,
  removeUser,
  type UserState,
} from "../features/authorization/userSlice";
import { Login } from "../features/authorization/Login";

const Body = () => {
  const dispatch = useAppDispatch();

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
        const { uid, email, displayName, photoURL } = user;
        if (uid && email && displayName && photoURL) {
          const userDetails: UserState = {
            uid,
            email,
            displayName,
            photoURL,
          };
          dispatch(addUser(userDetails));
        }
      } else {
        dispatch(removeUser());
      }
    });
  }, []);

  return <RouterProvider router={appRouter} />;
};

export default Body;
