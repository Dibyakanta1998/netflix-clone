import { useRef, useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { checkValidData } from "../utils/validate";
import { auth } from "../config/firebase";
import { addUser, type UserState } from "../features/authorization/userSlice";
import { useAppDispatch } from "../customHooks/reduxHooks";

export const LoginForm: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
              if (auth.currentUser) {
                const { uid, email, displayName, photoURL } = auth.currentUser;
                if (uid && email && displayName && photoURL) {
                  const userDetails: UserState = {
                    uid,
                    email,
                    displayName,
                    photoURL,
                  };
                  dispatch(addUser(userDetails));

                  navigate("/browse");
                }
              }
            })
            .catch(() => {
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
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current?.value || "",
        password.current?.value || ""
      )
        .then(() => {
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          setErrorMessage(errorCode + " - " + errorMessage);
        });
    }
  };
  return (
    <div>
      <div className="flex justify-center items-center">
        <form
          onSubmit={(e) => e.preventDefault()}
          // className="absolute w-3/12 p-12 bg-black my-36 mx-auto right-0 left-0  text-white rounded-lg opacity-80"
          className="flex-col  p-12  bg-black my-36 text-white rounded-lg opacity-80 max-w-3/12 "
        >
          <h1 className="flex-auto font-bold text-3xl py-4">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignInForm && (
            <input
              type="text"
              placeholder="Full Name"
              className="flex-auto p-4 my-4  bg-gray-700 text-black-50 w-full"
              // value={"Dibyakanta Barik"}
              ref={name}
            />
          )}
          <input
            type="text"
            ref={email}
            placeholder="Email Address"
            className="flex-auto p-4 my-4  bg-gray-700 text-black-50 w-full "
            // value={"dibyakanta9937@gmail.com"}
          />
          <input
            type="password"
            ref={password}
            placeholder="Password"
            className="flex-auto p-4 my-4 bg-gray-700 text-black-50 w-full"
            value={"Abc@1234"}
          />
          <p className="text-red-500 font-bold text-lg py-2 flex-auto">
            {errorMessage}
          </p>
          <button
            className="p-4 my-6 bg-red-700 w-full rounded-lg flex-auto"
            onClick={handleButtonClick}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          <p
            className="py-6 cursor-pointer flex-auto"
            onClick={toggleSignInForm}
          >
            {isSignInForm
              ? "New to netflix? Sign Up Now"
              : "Already Registered? Sign In Now"}
          </p>
        </form>
      </div>
    </div>
  );
};
