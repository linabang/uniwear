import { Link, useNavigate } from "react-router-dom";
import Icon from "../../assets/iconRegistr.svg";
import Header from "../header/header";
import { useState } from "react";
import { useRegistr } from "../../store/auth-slice/auth-slice";
import { toast } from "react-toastify";
const Registr = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const nav = useNavigate()

  const { isFetch, registrUser} = useRegistr()
  const onHandleSubmit = (e) => {
    e.preventDefault();
    if (password === passwordTwo) {
       registrUser(email,password,nav)
       setEmail('')
       setPassword('')
       setPasswordTwo('')
    } else {
      console.log('error');
      toast('Произошла ошибка!!!')
    }
  }
  return (
    <>
      <Header />
      <div className="w-full flex justify-center pl-[20px] pr-[20px] ">
        <div
          className="flex flex-col md:flex-row items-center  max-w-[980px] w-full h-auto rounded-[32px] overflow-hidden mx-auto mt-[34px] mb-[105px] bg-[#F0F3FB] md:bg-white "
          style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
        >
          <div className="flex items-center justify-center max-w-[373px] w-full h-full bg-[#F0F3FB]">
            <img src={Icon} alt="no" />
          </div>
          <div className="max-w-[616px] w-full h-full flex flex-col items-center pl-[20px] pr-[20px]  ">
            <h1 className="text-[30px] font-bold mt-0 md:mt-[91px] mb-[25px] md:mb-[52px] ">
              Create account
            </h1>
            <form onSubmit={onHandleSubmit} action="" className="w-full flex flex-col md:items-center  ">
              <div className="flex flex-col gap-y-[6px] mb-[21px] ">
                <label className="text-[14px] font-normal " htmlFor="">
                  Email address
                </label>
                <input
                  value={email}
                  autoComplete="username"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full md:w-[353px] h-[56px] rounded-[10px] text-[16px] text-[#00000080] border pl-[16px] "
                  type="email"
                  placeholder="Your email"
                />
              </div>
              <div className="flex flex-col gap-y-[6px] mb-[21px] ">
                <label className="text-[14px] font-normal " htmlFor="">
                  Create a password
                </label>
                <input
                  value={password}
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full md:w-[353px] h-[56px] rounded-[10px] text-[16px] text-[#00000080] border pl-[16px] "
                  type="password"
                  placeholder="must be 8 characters"
                />
              </div>
              <div className="flex flex-col gap-y-[6px] mb-[49px] ">
                <label className="text-[14px] font-normal " htmlFor="">
                  Confirm password
                </label>
                <input
                  value={passwordTwo}
                  autoComplete="new-password"
                  onChange={(e) => setPasswordTwo(e.target.value)}
                  className="w-full md:w-[353px] h-[56px] rounded-[10px] text-[16px] text-[#00000080] border pl-[16px] "
                  type="password"
                  placeholder="repeat password"
                />
              </div>
              <button disabled={isFetch} className="w-full md:w-[353px] h-[56px] rounded-[10px] text-[16px] font-semibold text-white bg-black  ">
                Create account
              </button>
            </form>
            <Link to={"/login"} className="text-[14px] mt-[37px] mb-[80px] md:mb-[169px] ">
              Already have an account?{" "}
              <span className=" font-bold "> Log in</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registr;