import Exit from "../../assets/exit.svg";
import Store from '../../assets/store.svg'
import Sign from '../../assets/sign-in.svg'
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebase/firebase-config";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);
  const onHandleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
      toast('Вы вышли из акаунта 😭')
    } catch (error) {
      console.error("Ошибка",error);
    }
  };

  return (
    <div className=" w-full h-[70px] max-w-[1220px] flex justify-between items-center mx-auto pl-[25px] pr-[25px] ">
      <Link to={"/"} className="text-[42px] font-semibold ">
        Uniwear
      </Link>
      <div className="flex gap-x-[19px] ">
        <div className="flex justify-center gap-x-[8px] ">
            <Link to={'/basket'}><img src={Store} alt="Shop" /></Link>
            {user ? (
              <div onClick={onHandleLogout}>
                <img src={Sign} alt="Profile" />
              </div>
            ) : (
              <Link to="/login">
                <img src={Exit} alt="Exit" />
              </Link>
            )}
        </div>
      </div>
    </div>
  );
};
export default Header
