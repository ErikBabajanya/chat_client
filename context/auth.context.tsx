"use client";
import * as React from "react";
import { Message } from "postcss";
import { useEffect, useState } from "react";
import { User } from "@/interface/user.interface";
import { json } from "body-parser";

interface UserFormValues {
  picture: File | null;
  firstName: string;
  lastName: string;
  bio: string;
}

export type AuthContextType = {
  login: (e: React.FormEvent) => void;
  updateLoginInfo: (info: Phone) => void;
  loginUserInfo: Phone;

  verify: (e: React.FormEvent) => void;
  updateVerifyInfo: (info: Code) => void;
  codeUser: Code;

  token: string | null;
  verifyToken: string | null;

  myUser: User | null;
  changeUserInfo: (changeInfo: any) => void;
};

interface Phone {
  phone: string;
}

interface Code {
  code: string;
}

export const Auth = React.createContext<AuthContextType | null>(null);
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const endpoint = "http://localhost:5000";
  const [token, setToken] = useState<string | null>(null);
  const [verifyToken, setVerifyToken] = useState<string | null>(null);
  const [loginUserInfo, setLoginUserInfo] = useState<Phone>({
    phone: "",
  });
  useEffect(() => {
    const tokenString = localStorage.getItem("token");
    if (!tokenString) return;
    setToken(JSON.parse(tokenString));
  }, []);

  const updateLoginInfo = (info: Phone) => {
    setLoginUserInfo(info);
  };
  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${endpoint}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: loginUserInfo.phone }),
      });

      if (response.ok) {
        const data = await response.json();
        setVerifyToken(data.token);
      } else {
        console.error("Authentication failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [codeUser, setCodeUser] = useState<Code>({
    code: "",
  });

  const updateVerifyInfo = (info: Code) => {
    setCodeUser(info);
  };

  const verify = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${endpoint}/auth/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `${verifyToken}`,
        },
        body: JSON.stringify({ code: codeUser.code }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", JSON.stringify(data.token));
        setToken(data.token);
      } else {
        console.error("Authentication failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const [myUser, setMyuser] = useState<User | null>(null);
  useEffect(() => {
    if (!token) return;
    const findMyUser = async () => {
      const response = await fetch(`${endpoint}/user/findMyUser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `${token}`,
        },
      });

      const data = await response.json();
      setMyuser(data);
    };
    findMyUser();
  }, [token]);

  const changeUserInfo = async (changeInfo: UserFormValues) => {
    const formData = new FormData();

    formData.append("firstName", changeInfo.firstName);
    formData.append("lastName", changeInfo.lastName);
    formData.append("bio", changeInfo.bio);
    if (changeInfo?.picture) {
      formData.append("picture", changeInfo?.picture);
    }

    const response = await fetch(`${endpoint}/user/chageMyUserInfo`, {
      method: "PUT",
      headers: {
        authorization: `${token}`,
      },
      body: formData,
    });

    const data = await response.json();
    setMyuser(data);
  };
  return (
    <Auth.Provider
      value={{
        loginUserInfo,
        updateLoginInfo,
        login,

        updateVerifyInfo,
        verify,
        codeUser,

        token,
        verifyToken,

        myUser,
        changeUserInfo,
      }}
    >
      {children}
    </Auth.Provider>
  );
};

export default AuthProvider;
