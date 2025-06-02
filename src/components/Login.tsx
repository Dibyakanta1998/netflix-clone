import { useRef, useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

export const Login: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isSignInForm, setIsSignInForm] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const email = useRef<HTMLInputElement | null>(null);

  const password = useRef<HTMLInputElement | null>(null);
  const name = useRef<HTMLInputElement | null>(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    //validate

    const message = checkValidData(
      email.current?.value,
      password.current?.value
    );
    setErrorMessage(message);

    if (message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current?.value || "",
        password.current?.value || ""
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name?.current?.value,
            photoURL:
              "https://avatars.githubusercontent.com/u/104753435?s=400&u=f2a2e6e65b99fd1ab611201998612dc02e6a426f&v=4",
          })
            .then(() => {
              // Profile updated!
              // ...
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName, photoURL }));

              navigate("/browse");
            })
            .catch((error) => {
              setErrorMessage(errorMessage);

              // An error occurred
              // ...
            });

          console.log("🚀 ~ .then ~ user:", user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage);
          // navigate("/");

          // ..
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current?.value || "",
        password.current?.value || ""
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigate("/browse");

          console.log("🚀 ~ .then ~ user:signing", user);

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // navigate("/");

          setErrorMessage(errorCode + " - " + errorMessage);
        });
    }

    console.log("🚀 ~ handleButtonClick ~ message:", message);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/af2fac72-d956-4952-8686-4d45d359d78c/web/IN-en-20250526-TRIFECTA-perspective_5db3e163-56f7-47c7-9a65-b79b9d76bf24_large.jpg"
          alt="logo"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute w-3/12 p-12 bg-black my-36 mx-auto right-0 left-0  text-white rounded-lg opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-4 my-4  bg-gray-700 text-black-50 w-full"
            // value={"Dibyakanta Barik"}
            ref={name}
          />
        )}
        <input
          type="text"
          ref={email}
          placeholder="Email Address"
          className="p-4 my-4  bg-gray-700 text-black-50 w-full"
          // value={"dibyakanta9937@gmail.com"}
        />
        <input
          type="password"
          ref={password}
          placeholder="Password"
          className="p-4 my-4 bg-gray-700 text-black-50 w-full"
          value={"Abc@1234"}
        />
        <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
        <button
          className="p-4 my-6 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className="py-6 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to netflix? Sign Up Now"
            : "Already Registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};
