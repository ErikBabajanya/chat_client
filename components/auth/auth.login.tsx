"use client";
import { useContext } from "react";
import Login from "./auth/login";
import Verify from "./auth/verify";
import { Auth } from "@/context/auth.context";
export default function AuthLogin() {
  const auth = useContext(Auth);
  if (!auth) return;
  const { verifyToken } = auth;
  return (
    <div className="w-full h-full">{verifyToken ? <Verify /> : <Login />}</div>
  );
}
