import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputSign from "./InputSign";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (error) {
      setError("");
    }
  }, [email, password]);

  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  }

  async function signInWithFacebook() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "facebook",
    });
  }

  async function loginWithEmailAndPassword() {
    if (!email || !password) {
      setError("Please enter your email and password");
      return;
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    }
  }

  return (
    <div className="mt-10 lg:mt-0 ">
      <p className="font-bold text-xl">Sign In</p>
      <span>{error}</span>
      <div className="mt-4 flex flex-col w-full xs:w-[350px]">
        <InputSign
          placeholder="Email"
          isPassword={false}
          isEmail={true}
          value={email}
          setValue={setEmail}
        />
        <InputSign
          placeholder="Password"
          isPassword={true}
          isEmail={false}
          value={password}
          setValue={setPassword}
        />{" "}
        <div className="flex justify-end">
          <span className="text-[#B0B0B0] mt-2 text-xs cursor-pointer self-end">
            Forgot password?
          </span>
        </div>
        <button
          onClick={loginWithEmailAndPassword}
          className="mt-10 bg-[#4D47C3] py-3 rounded-lg text-white text-sm tracking-wide"
        >
          Login
        </button>
        <div className="flex flex-col items-center mt-10">
          <span className="text-xs text-[#B5B5B5]  ">Or continue with</span>
          <div className="flex items-center space-x-3 mt-5">
            <FontAwesomeIcon
              icon={faFacebook}
              className="!w-7 !h-7 text-blue-500  cursor-pointer"
              onClick={signInWithFacebook}
            />
            <FontAwesomeIcon
              icon={faGoogle}
              onClick={signInWithGoogle}
              className="!w-7 !h-7 text-[#DB4437] cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
