import { createBrowserRouter } from "react-router-dom";
import React, { lazy, Suspense } from "react";

const Chat = lazy(() => import("../components/Chat"));
const Login = lazy(() => import("../components/login/Login"));
const Register = lazy(() => import("../components/signup/Register"));
const SetAvatar = lazy(() => import("../components/avatarImage/SetAvatar"));
const SignUpFields = lazy(() => import("../dynamicFields/SignUpFields"));
const DynamicField = lazy(() => import("../dynamicFields/DynamicField"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div className="centertheText">Loading...</div>}>
        <Chat />
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<div className="centertheText">Loading...</div>}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<div className="centertheText">Loading...</div>}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: "/setAvatar",
    element: (
      <Suspense fallback={<div className="centertheText">Loading...</div>}>
        <SetAvatar />
      </Suspense>
    ),
  },
  {
    path: "/a",
    element: (
      <Suspense fallback={<div className="centertheText">Loading...</div>}>
        <DynamicField />
      </Suspense>
    ),
  },
  {
    path: "/sin",
    element: (
      <Suspense fallback={<div className="centertheText">Loading...</div>}>
        <SignUpFields />
      </Suspense>
    ),
  },
]);

export default router;
