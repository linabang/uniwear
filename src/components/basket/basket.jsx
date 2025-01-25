import Header from "../header/header";
import Arrow from "../../assets/arrow.svg";
import IconBasket from '../../assets/basket.svg'

const Basket = () => {
  return (
    <>
      <Header />
      <div className="max-w-[893px] mx-auto flex justify-between mt-[51px] mb-[130px] ">
        <div className="w-[466px] ">
          <div className="mb-[26px] flex gap-x-[14px]">
            <h1 className="text-[36px] font-bold">Cart</h1>
            <img src={Arrow} alt="no" />
          </div>
          <div className="flex gap-x-[35px] relative ">
            <img className="absolute top-[3px] left-[90%] " src={IconBasket} alt="" />
            <div className="flex flex-col gap-y-[20px] justify-center ">
              <img
                className="w-[133px] h-[137px] "
                src="https://storage.fabrikamaek.ru/images/0/3/3766/3766577/previews/people_1_man_trousers_front_black_500.jpg"
                alt="no"
              />
              <div
                className="flex justify-between w-[137px] h-[42px] rounded-[24px] pl-[11px] pr-[11px] "
                style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
              >
                <button className="text-[21px] font-bold ">+</button>
                <button className="text-[21px] font-bold ">1</button>
                <button className="text-[21px] font-bold ">-</button>
              </div>
            </div>
            <div>
              <h2 className="text-[21px] font-bold ">Uni pants</h2>
              <h2 className="text-[18px] text-[#616161] font-bold ">
                Men pants
              </h2>
              <h2 className="text-[18px] text-[#616161] font-bold ">Size: M</h2>
              <h2 className="text-[21px] font-bold mt-[25px] ">3000 сом</h2>
            </div>
          </div>
        </div>
        <div className="w-[320px] ">
          <h2 className="text-[30px] font-bold mb-[25px] ">Summary</h2>
          <div className="flex justify-between gap-y-[8px] ">
            <h2 className="text-[22px] font-medium ">Subtotal</h2>
            <h3 className="text-[18px] font-medium ">3000 сом</h3>
          </div>
          <div className="flex justify-between ">
            <h2 className="text-[22px] font-medium">Delivery</h2>
            <h3 className="text-[18px] font-medium ">Free</h3>
          </div>
          <div className="border border-[#D3D3D3] mt-[13px] mb-[16px] "></div>
          <div className="flex justify-between ">
            <h2 className="text-[22px] font-bold ">Total</h2>
            <h2 className="text-[18px] font-bold ">3000 сом</h2>
          </div>
          <button className="w-full h-[56px] bg-[#000000] text-white text-[16px] font-semibold rounded-[10px] mt-[76px] ">
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default Basket;
