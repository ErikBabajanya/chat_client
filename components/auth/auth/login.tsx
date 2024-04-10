"use client";

import React, { useState } from "react";
import { useContext } from "react";
import { BsTelegram } from "react-icons/bs";
import { Auth } from "@/context/auth.context";

export default function Login() {
  const auth = useContext(Auth);
  if (!auth) return;
  const { updateLoginInfo, loginUserInfo, login } = auth;

  return (
    <div className="w-full h-[100vh] bg-surface-color overflow-y-auto">
      <div className="w-full h-full flex flex-col items-center mt-[48px]">
        <div className="bg-surface-color w-full h-[100vh] flex flex-col items-center">
          <BsTelegram className="min-w-[160px] min-h-[160px] text-message-out-background-color" />
          <div className="text-center text-[2rem] pt-[26px] mb-[14px] leading-[110%] font-medium text-primary-text-color">
            Sign in to Telegram
          </div>
          <div>
            <p className="text-secondary-text-color text-center">
              Please confirm your country code <br /> and enter your phone
              number.
            </p>
          </div>
          <div className="w-full justify-center flex ">
            <div className="w-full mt-[40px] w-[362px] h-[340px]">
              <div className="flex justify-center">
                <form
                  onSubmit={login}
                  autoComplete="off"
                  className="w-[362px] h-[340px] flex justify-around flex-col"
                >
                  <div className="w-full h-[58px] justify-center hover:bg-message-out-background-color flex items-center rounded-[10px] p-[15px] bg-input-search-border-color">
                    <div className="relative bg-surface-color top-0 left-0 min-w-[360px] h-[56px] rounded-[10px] p-[15px]">
                      <label className="text-[#9e9e9e] bg-surface-color w-auto px-[10px] flex justify-center text-[10px] absolute left-[20px] top-[-7px]">
                        Country
                      </label>
                      <span className="leading-[1.3125] text-primary-text-color">
                        Armenia
                      </span>
                      <div className="w-full h-[56px] absolute top-0 left-0 hover:border-message-out-background-color "></div>
                    </div>
                  </div>
                  <div className="w-full h-[58px] justify-center hover:bg-message-out-background-color flex items-center rounded-[10px] p-[15px] bg-input-search-border-color">
                    <div className="relative bg-surface-color flex items-center top-0 left-0 min-w-[360px] h-[56px] rounded-[10px] p-[15px]">
                      <label className="text-[#9e9e9e] bg-surface-color w-auto px-[10px] flex justify-center text-[10px] absolute left-[20px] top-[-7px]">
                        Phone Number
                      </label>
                      <span className="leading-[1.3125] text-primary-text-color">
                        <input
                          className="w-full focus:outline-none text-[#9e9e9e] absolute bg-transparent z-10 h-full left-0 top-0 pl-[16px]"
                          id="phone"
                          name="phone"
                          autoCapitalize="phone"
                          required
                          onChange={(e) =>
                            updateLoginInfo({
                              ...loginUserInfo,
                              phone: e.target.value,
                            })
                          }
                          placeholder="Enter phone number"
                        />
                        <span className="text-[#9e9e9e]"></span>
                      </span>

                      <div className="w-full h-[56px] absolute top-0 left-0 hover:border-message-out-background-color "></div>
                    </div>
                  </div>
                  <label className="w-full flex items-center h-[56px] w-full px-[19px]">
                    <input type="checkbox" className=" w-[20px] h-[20px]" />
                    <span className="pl-[54px] leading-[1.3] text-primary-text-color">
                      Keep me signed in
                    </span>
                  </label>
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
      </div>
    </div>
  );
}
