import { MdOutlineAddAPhoto } from "react-icons/md";
import { CiSaveUp1 } from "react-icons/ci";
import { useContext, useEffect, useState } from "react";
import { Auth } from "@/context/auth.context";
import { useForm } from "react-hook-form";

export default function Content() {
  const auth = useContext(Auth);
  if (!auth) return;
  const { myUser, changeUserInfo } = auth;
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      firstName: myUser?.firstName || "",
      lastName: myUser?.lastName || "",
      bio: myUser?.bio || "",
    },
  });

  const { isDirty, errors } = formState;
  const onSubmit = (data: any) => changeUserInfo(data);
  return (
    <div className="w-full h-full ">
      <div className="w-full py-4 flex justify-center items-center">
        <div className="w-[120px] h-[120px] rounded-[50%] bg-profile-color  relative">
          <button className="w-full h-full absolute rounded-[50%] flex justify-center items-center">
            <MdOutlineAddAPhoto className="w-[48px] h-[48px] text-[#fff]" />
          </button>
        </div>
      </div>
      <div className="w-full px-4 py-4">
        <form
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          className="h-[240px] flex justify-between flex-col"
        >
          <div
            className={`${
              isDirty ? "bottom-[20px]" : "bottom-[-200px]"
            } absolute right-[16px] w-[54px] h-[54px] bg-message-out-background-color rounded-[50%] flex items-center justify-center transition-bottom duration-slow`}
          >
            <button className="absolute w-full h-full rounded-[50%]"></button>
            <CiSaveUp1 className="w-[24px] h-[24px] text-primary-text-color" />
          </div>
          <div className="w-full h-[54px] relative">
            <label className="text-[#9e9e9e] select-none bg-surface-color w-auto px-[10px] flex justify-center text-[10px] absolute left-[20px] top-[-7px]">
              Name
            </label>
            <input
              {...register("firstName")}
              placeholder="Name"
              className={`w-full p-[15px] text-primary-text-color rounded-[10px] hover:border-message-out-background-color border border-input-search-border-color focus:border focus:border-[2px] focus:border-message-out-background-color bg-transparent focus:outline-none focus-visible:outline-none`}
            />
          </div>
          <div className="w-full h-[54px] relative">
            <label className="text-[#9e9e9e] select-none bg-surface-color w-auto px-[10px] flex justify-center text-[10px] absolute left-[20px] top-[-7px]">
              Last Name
            </label>
            <input
              {...register("lastName")}
              placeholder="Last Name"
              className="w-full p-[15px] text-primary-text-color rounded-[10px] hover:border-message-out-background-color border border-input-search-border-color focus:border focus:border-[2px] focus:border-message-out-background-color bg-transparent focus:outline-none focus-visible:outline-none"
            />
          </div>
          <div className="w-full h-[54px] relative">
            <label className="text-[#9e9e9e] select-none bg-surface-color w-auto px-[10px] flex justify-center text-[10px] absolute left-[20px] top-[-7px]">
              Bio (Optional)
            </label>
            <input
              {...register("bio")}
              placeholder="Bio (Optional)"
              className="w-full p-[15px] text-primary-text-color rounded-[10px] hover:border-message-out-background-color border border-input-search-border-color focus:border focus:border-[2px] focus:border-message-out-background-color bg-transparent focus:outline-none focus-visible:outline-none"
            />
          </div>
        </form>
      </div>
      <div className="bg-input-search-background-color text-[14px] leading-[18px] select-none px-4 h-[80px] flex items-center text-[#9e9e9e]">
        Any details such as age, occupation or city.
        <br />
        Example: 23 y.o. designer from San Francisco
      </div>
    </div>
  );
}
