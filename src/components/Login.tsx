import React, { type FC } from "react";
import { Header } from "./Header";

export const Login: FC = () => {
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/af2fac72-d956-4952-8686-4d45d359d78c/web/IN-en-20250526-TRIFECTA-perspective_5db3e163-56f7-47c7-9a65-b79b9d76bf24_large.jpg"
          alt="logo"
        />
      </div>
      <form className="absolute w-3/12 p-12 bg-black my-36 mx-auto right-0 left-0">
        <input
          type="text"
          placeholder="Email Address"
          className="p-2 m-2  bg-white"
        />
        <input
          type="password"
          placeholder="Email Address"
          className="p-2 m-2 bg-white"
        />
        <button className="p-4 m-4">Sign In</button>
      </form>
    </div>
  );
};
