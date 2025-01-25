import { Link, useNavigate } from "react-router-dom";
import Icon from "../../assets/iconRegistr.svg";
import Header from "../header/header";
import { useState } from "react";
import { useRegistr } from "../../store/auth-slice/auth-slice";
import { toast } from "react-toastify";
import { motion } from "motion/react";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const nav = useNavigate();
  const { isFetch, loginUser } = useRegistr();

  const onHandleSubmit = (e) => {
    e.preventDefault();
    if (password && email) {
      loginUser(email, password, nav);
      setEmail("");
      setPassword("");
    } else {
      console.log("error");
      toast("Произошла ошибка!!!");
    }
  };

  return (
    <>
      <Header />
      <motion.div
        initial={{ x: -1000, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        div
        className="w-full flex justify-center pl-[20px] pr-[20px] "
      >
        <div
          className="flex flex-col md:flex-row items-center justify-center max-w-[980px] w-full h-auto rounded-[32px] overflow-hidden mx-auto mt-[34px] mb-[105px] bg-[#F0F3FB] md:bg-white "
          style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
        >
          <div className="flex items-center justify-center max-w-[373px] w-full h-full bg-[#F0F3FB]">
            <img src={Icon} alt="no" />
          </div>
          <div className="max-w-[616px] w-full h-full flex flex-col items-center pl-[20px] pr-[20px]  ">
            <h1 className="text-[30px] font-bold mt-0 md:mt-[91px] mb-[25px] md:mb-[52px] ">
              Sign in
            </h1>
            <form
              onSubmit={onHandleSubmit}
              action=""
              className="w-full flex flex-col md:items-center "
            >
              <div className="flex flex-col gap-y-[6px] mb-[21px] ">
                <label className="text-[14px] font-normal " htmlFor="">
                  Email address
                </label>
                <input
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full md:w-[353px] h-[56px] rounded-[10px] text-[16px] text-[#00000080] border pl-[16px] "
                  type="email"
                  placeholder="Your email"
                />
              </div>
              <div className="flex flex-col gap-y-[6px] mb-[49px] ">
                <label className="text-[14px] font-normal " htmlFor="">
                  Password
                </label>
                <input
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full md:w-[353px] h-[56px] rounded-[10px] text-[16px] text-[#00000080] border pl-[16px] "
                  type="password"
                  placeholder="repeat password"
                />
              </div>
              <button
                disabled={isFetch}
                className="w-full md:w-[353px] h-[56px] rounded-[10px] text-[16px] font-semibold text-white bg-black  "
              >
                Log in
              </button>
            </form>
            <Link
              to={"/registr"}
              className="text-[14px] mt-[52px] mb-[80px] md:mb-[169px] "
            >
              Don’t have an account?
              <span className=" font-bold "> Sign up</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Login;