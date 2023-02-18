import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputSign from "./InputSign";
import {
  faFacebook,
  faGoogle,
  faTelegramPlane,
} from "@fortawesome/free-brands-svg-icons";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { Toast } from "flowbite-react";
import { motion } from "framer-motion";
import { icons } from "@/lib/icons";

const SignUp = ({ setUser }: { setUser: any }) => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [confirmeMessage, setConfirmeMessage] = useState<boolean>(false);

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

  async function createUserWithEmailAndPassword() {
    if (!email || !password || !username || !passwordConfirm) {
      setError("All fields are required");
      return;
    }
    if (password !== passwordConfirm) {
      setError("Password must be equal to the confirmed password");
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      supabase
        .from("users")
        .insert({
          email,
          username,
          pic: icons[
            Math.floor(Math.random() * (Math.floor(3) - Math.ceil(0) + 1)) + 0
          ].url,
        })
        .then((res) => console.log({ res }));

      setConfirmeMessage(true);
    }
  }

  return (
    <div className="mt-10 lg:mt-0 ">
      {confirmeMessage ? (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="space-x-4 divide-x divide-gray-200  dark:divide-gray-700"
        >
          <Toast>
            <FontAwesomeIcon
              icon={faTelegramPlane}
              className="h-5 w-5 text-blue-600 dark:text-blue-500"
            />
            <div className="pl-4 text-sm font-normal">
              Message sent successfully.
            </div>
          </Toast>
        </motion.div>
      ) : null}
      <p className="font-bold text-xl">Sign Up</p>
      <div className="mt-4 flex flex-col w-full xs:w-[350px]">
        <InputSign
          placeholder="Username"
          isPassword={false}
          isEmail={true}
          value={username}
          setValue={setUsername}
        />
        <InputSign
          placeholder="Email"
          isPassword={false}
          isEmail={false}
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
        <InputSign
          placeholder="Password Confirm"
          isPassword={true}
          isEmail={false}
          value={passwordConfirm}
          setValue={setPasswordConfirm}
        />
        <button
          onClick={createUserWithEmailAndPassword}
          className="mt-8 bg-[#4D47C3] py-3 rounded-lg text-white text-sm tracking-wide"
        >
          Register
        </button>
        <div className="flex flex-col items-center mt-10">
          <span className="text-xs text-[#B5B5B5]  ">Or continue with</span>
          <div className="flex items-center space-x-3 mt-5">
            <FontAwesomeIcon
              icon={faFacebook}
              onClick={signInWithFacebook}
              className="!w-7 !h-7 text-blue-500  cursor-pointer"
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

export default SignUp;
