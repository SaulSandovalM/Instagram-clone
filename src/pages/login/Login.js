import React, { useState } from "react";
import SignIn from "./SignUp";
import SignUp from "./SignIn";

export default function Login() {
  const [registered, setRegistered] = useState(false);

  const onClickhandleChangeLogin = () => {
    setRegistered(!registered);
  };

  return (
    <div>
      {registered ? (
        <SignUp onChangeHeadline={onClickhandleChangeLogin} />
      ) : (
        <SignIn onChangeHeadline={onClickhandleChangeLogin} />
      )}
    </div>
  );
}
