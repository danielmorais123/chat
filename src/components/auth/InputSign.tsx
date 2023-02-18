const InputSign = ({
  placeholder,
  isPassword,
  isEmail,
  value,
  setValue,
}: {
  placeholder: string;
  isPassword: boolean;
  isEmail: boolean;
  value: string;
  setValue: any;
}) => {
  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type={isPassword ? "password" : "email"}
      placeholder={placeholder}
      className={`p-3 ${
        isEmail ? "" : "mt-5"
      } py-4 outline-none bg-[#F0EFFF] placeholder-[#A7A3FF] text-xs rounded-lg w-full border-2 focus:border-blue-500`}
    />
  );
};

export default InputSign;
