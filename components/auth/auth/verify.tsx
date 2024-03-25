"use client";

import React, { useState } from "react";
import { useContext } from "react";
import { Auth } from "@/context/auth.context";
export default function Verify() {
  const auth = useContext(Auth);
  if (!auth) return;
  const { updateVerifyInfo, verify, codeUser } = auth;
  return (
    <div className="bg-surface-color w-full h-[100vh]">
      <div>
        <p className="text-secondary-text-color text-center">
          Please confirm your code
        </p>
      </div>
      <div className="w-full justify-center flex ">
        <div className="w-full mt-[40px] w-[362px] h-[340px]">
          <div className="flex justify-center">
            <form
              onSubmit={verify}
              className="w-[362px] h-[340px] flex justify-around flex-col"
            >
              <div className="w-full h-[58px] justify-center hover:bg-message-out-background-color flex items-center rounded-[10px] p-[15px] bg-input-search-border-color">
                <div className="relative bg-surface-color flex items-center top-0 left-0 min-w-[360px] h-[56px] rounded-[10px] p-[15px]">
                  <label className="text-[#9e9e9e] bg-surface-color w-auto px-[10px] flex justify-center text-[10px] absolute left-[20px] top-[-7px]">
                    Phone Number
                  </label>
                  <span className="leading-[1.3125] text-primary-text-color">
                    <input
                      className="w-full text-[#9e9e9e] absolute bg-transparent z-10 h-full left-0 top-0 pl-[10px]"
                      id="code"
                      name="code"
                      autoCapitalize="code"
                      required
                      onChange={(e) =>
                        updateVerifyInfo({
                          ...codeUser,
                          code: e.target.value,
                        })
                      }
                      placeholder="Enter SMS Code"
                    />
                  </span>

                  <div className="w-full h-[56px] absolute top-0 left-0 hover:border-message-out-background-color "></div>
                </div>
              </div>
              <label className="flex relative rounded-[10px] w-full h-[54px] bg-message-out-background-color flex justify-center items-center">
                <button
                  type="submit"
                  className="absolute w-full h-full"
                ></button>
                <div className="text-primary-text-color">NEXT</div>
              </label>
              <label className="flex w-full h-[54px]"></label>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
