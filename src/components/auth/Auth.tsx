import { Poppins } from "@next/font/google";
import authpng from "../../assets/authv2.png";
import SignIn from "./SignIn";
import { useState } from "react";
import SignUp from "./SignUp";
const poppins = Poppins({ subsets: ["latin"], weight: "400" });

const Auth = ({ setUser }: { setUser: any }) => {
  const [isLoginPage, setIsLoginPage] = useState(true);

  return (
    <div
      className={`h-screen bg-white ${poppins.className} flex relative justify-start lg:justify-between text-[#2b2b2b]  lg:items-center`}
    >
      <span className="absolute lg:top-0 right-0 p-6 font-bold tracking-wider text-lg hidden xs:flex">
        VenomChat
      </span>
      <img
        src={authpng.src}
        className="absolute bottom-0 lg:left-0 right-0 mx-auto h-[340px] pointer-events-none object-contain sm:h-auto hidden xs:flex"
      />
      <div className="lg:w-[80%] w-[95%] 2xl:w-[60%] mx-auto lg:flex-row flex-col flex lg:justify-between p-2 mt-3 lg:mt-0">
        <div className={`flex flex-col ${!isLoginPage && "justify-center"}`}>
          <p className="text-3xl font-bold ">
            Sign {isLoginPage ? "In" : "Up"} to
          </p>
          <p className="mt-3 tracking-wider text-xl font-semibold">
            My Chat App - VenomChat
          </p>
          {isLoginPage ? (
            <>
              <p className="mt-8 text-xs">
                If you don't have an account registered
              </p>
              <p className="text-xs mt-2">
                You can
                <a
                  className="text-[#4D47C3] font-bold cursor-pointer"
                  onClick={() => setIsLoginPage(false)}
                >
                  {` `} Register Here
                </a>
              </p>
            </>
          ) : (
            <>
              <p className="mt-8 text-xs">
                If you already have an account registered
              </p>
              <p className="text-xs mt-2">
                You can
                <a
                  className="text-[#4D47C3] font-bold cursor-pointer"
                  onClick={() => setIsLoginPage(true)}
                >
                  {` `} Login Here
                </a>
              </p>
            </>
          )}
        </div>
        {isLoginPage ? <SignIn /> : <SignUp setUser={setUser} />}
      </div>
    </div>
  );
};

export default Auth;
