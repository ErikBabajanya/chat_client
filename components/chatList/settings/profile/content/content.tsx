import { MdOutlineAddAPhoto } from "react-icons/md";
import { CiSaveUp1 } from "react-icons/ci";
import {
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState,
  FormEvent,
} from "react";
import { Auth } from "@/context/auth.context";
import { useForm } from "react-hook-form";
import { IoMdCheckmark } from "react-icons/io";
import { SettingsContext } from "@/context/settings.context";

interface UserFormValues {
  picture: File | null;
  firstName: string;
  lastName: string;
  bio: string;
}

export default function Content() {
  const auth = useContext(Auth);
  const settingsContext = useContext(SettingsContext);
  if (!auth || !settingsContext) return;
  const { openProfile } = settingsContext;
  const { myUser, changeUserInfo } = auth;
  const [loading, setLoading] = useState<boolean>(false);

  const input = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, formState, watch, setValue } =
    useForm<UserFormValues>({
      defaultValues: {
        picture: null,
        firstName: myUser?.firstName || "",
        lastName: myUser?.lastName || "",
        bio: myUser?.bio || "",
      },
    });

  const { isDirty } = formState;
  const onSubmit = async (data: any) => {
    setLoading(true);
    await changeUserInfo(data);
    setLoading(false);
    openProfile();
    console.log(data);
  };

  const handleButtonClick = () => {
    const fileInput = input.current;
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    setValue("picture", e.target.files?.[0] ?? null);
  };

  const picture = watch("picture");
  return (
    <div className="w-full h-full ">
      <div className="w-full px-4 py-4">
        <form
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          className="h-[340px] flex justify-between flex-col"
        >
          <div className="w-full py-4 flex justify-center items-center">
            <div
              className={`w-[120px] h-[120px] rounded-full relative ${
                myUser?.picture ? "" : "bg-profile-color"
              }`}
            >
              {(picture || myUser?.picture) && (
                <img
                  src={
                    picture
                      ? URL.createObjectURL(picture)
                      : `data:image/jpeg;base64,${myUser?.picture}`
                  }
                  alt="Selected Image"
                  className="absolute w-full h-full rounded-full"
                />
              )}
              <input
                ref={input}
                className="w-10 h-10 hidden"
                type="file"
                accept="image/*"
                onChange={handleFile}
              />

              <button
                type="button"
                onClick={handleButtonClick}
                className="w-full h-full absolute rounded-full flex justify-center items-center avatar-edit"
              >
                <MdOutlineAddAPhoto className="w-[48px] h-[48px] text-[#fff] avatar-edit-icon" />
              </button>
            </div>
          </div>
          <div
            className={`${
              isDirty ? "bottom-[20px]" : "bottom-[-200px]"
            } absolute right-[16px] w-[54px] h-[54px] bg-message-out-background-color rounded-full flex items-center justify-center transition-bottom duration-slow`}
          >
            <button
              className={`absolute w-full h-full rounded-full ${
                loading ? "pointer-events-none" : ""
              }`}
            ></button>

            {loading ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <IoMdCheckmark className="w-[24px] h-[24px] text-primary-text-color" />
            )}
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
function dataURItoBlob(picture: string) {
  throw new Error("Function not implemented.");
}
