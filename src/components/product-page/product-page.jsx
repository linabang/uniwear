import Header from "../header/header";
import Arrow from "../../assets/arrow.svg";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { productDetails } from "../../store/product-details/product-details";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ProductPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [userId, setUserId] = useState(null);
  const { id } = useParams();
  const {
    defineProducts,
    getDefaneProducts,
    getSameProductByCategory,
    sameProduct,
    setCartNewItem,
  } = productDetails();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    getDefaneProducts(id);
  }, [id, getDefaneProducts]);

  useEffect(() => {
    if (defineProducts) {
      getSameProductByCategory(defineProducts?.category[0]);
    }
  }, [defineProducts, getSameProductByCategory]);

  const handleAddToCart = async () => {
    if (!userId) {
      toast.error("Вы не вошли в аккаунт");
      return;
    }

    if (!selectedSize) {
      toast.error("Выберите размер");
      return;
    }
    if (!defineProducts) {
      toast.error('Товат не найден')
      return;
    }

    try {
      await setCartNewItem({
        productID: id,
        chooseSize: selectedSize,
        userId,
      });
      toast.success("Товар добавлен в корзину");
    } catch (error) {
      toast.error("Что-то пошло не так", error);
    }
  };

  return (
    <>
      <Header />
      <div className="relative max-w-[1220px] mx-auto flex justify-center gap-x-[20px] mt-[81px]">
        <div className="w-[518px]">
          <Swiper
            style={{
              "--swiper-navigation-color": "#000",
              "--swiper-pagination-color": "#000",
              marginBottom: "12px",
            }}
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2"
          >
            {defineProducts?.images?.length > 0 ? (
              defineProducts.images.map((item, index) => (
                <SwiperSlide key={index}>
                  <img src={item?.img} alt="no img" />
                </SwiperSlide>
              ))
            ) : (
              <h2>No images</h2>
            )}
          </Swiper>
          <Swiper
            style={{
              width: "85%",
            }}
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={10}
            slidesPerView={8}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
          >
            {defineProducts?.images?.length > 0 ? (
              defineProducts.images.map((item, index) => (
                <SwiperSlide key={index}>
                  <img className="h-[46px] w-full" src={item?.img} alt="no img" />
                </SwiperSlide>
              ))
            ) : (
              <h2>No images</h2>
            )}
          </Swiper>
        </div>
        <form className="flex flex-col">
          <div className="flex flex-col gap-y-[10px]">
            <h2 className="text-[20px] text-[#616161] font-bold">{defineProducts?.subtitle}</h2>
            <h3 className="text-[48px] font-nunito">{defineProducts?.name}</h3>
            <h2 className="text-[24px] font-bold">{defineProducts?.price} </h2>
          </div>
          <div className="mt-[32px]">
            <h2 className="text-[16px] font-bold text-[#616161]">Размеры</h2>
            <div>
              {defineProducts?.sizes?.map((item, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault(); 
                    setSelectedSize(item?.value);
                  }}
                  className={`w-[53px] h-[52px] text-[32px] font-semibold transform transition-colors duration-300 rounded-[8px] ${
                    item?.value === selectedSize
                      ? "bg-black text-white"
                      : item?.isActive
                      ? "hover:bg-black hover:text-white bg-gray-200 text-gray-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  disabled={!item?.isActive}
                >
                  {item?.value}
                </button>
              ))}
            </div>
            <h2 onClick={() => setIsOpen(!isOpen)} className="text-[15px] font-bold">
              Подробнее о размерах
            </h2>
            {isOpen && (
              <table className="w-[341px] font-nunito bg-white absolute border-b border-black">
                <tbody>
                  <tr>
                    <td></td>
                    <td className="text-[20px] font-bold">xs</td>
                    <td className="text-[20px] font-bold">s</td>
                    <td className="text-[20px] font-bold">m</td>
                    <td className="text-[20px] font-bold">l</td>
                    <td className="text-[20px] font-bold">xl</td>
                  </tr>
                  <tr>
                    <td className="text-[16px] font-bold">Длина</td>
                    <td className="text-[20px] font-bold">102</td>
                    <td className="text-[20px] font-bold">102</td>
                    <td className="text-[20px] font-bold">102</td>
                    <td className="text-[20px] font-bold">102</td>
                    <td className="text-[20px] font-bold">102</td>
                  </tr>
                  <tr>
                    <td className="text-[16px] font-bold">Ширина</td>
                    <td className="text-[20px] font-bold">56</td>
                    <td className="text-[20px] font-bold">56</td>
                    <td className="text-[20px] font-bold">56</td>
                    <td className="text-[20px] font-bold">56</td>
                    <td className="text-[20px] font-bold">56</td>
                  </tr>
                  <tr>
                    <td className="text-[16px] font-bold">Толщина</td>
                    <td className="text-[20px] font-bold">33</td>
                    <td className="text-[20px] font-bold">33</td>
                    <td className="text-[20px] font-bold">33</td>
                    <td className="text-[20px] font-bold">33</td>
                    <td className="text-[20px] font-bold">33</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
          <button className="w-[568px] h-[45px] rounded-[11px] bg-[#1B1B1B] text-[19px] text-white font-bold mt-[69px] mb-[12px]">
            Приобрести
          </button>
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-[568px] h-[45px] rounded-[11px] border-[1px] border-black text-[19px] font-bold mb-[56px]"
          >
            Добавить в корзину
          </button>
          <p className="text-[19px] font-[600] w-[559px] font-nunito text-[#616161]">
            {defineProducts?.description}
          </p>
        </form>
      </div>
      <div className="max-w-[1220px] mx-auto relative">
        <div className="mb-[26px] flex gap-x-[14px]">
          <h1 className="text-[36px] font-bold">New arrivals</h1>
          <img src={Arrow} alt="Arrow" />
        </div>
        <Swiper
          watchSlidesProgress={true}
          slidesPerView={4}
          spaceBetween={20}
          className="h-[430px] w-[1220px] mb-[120px]"
        >
          {sameProduct?.length > 0 ? (
            sameProduct.map((product) => (
              <SwiperSlide key={product.id}>
                <Link
                to={`/productPage/${product.id}`}
                 className="w-[282px] h-[332px] rounded-[10px] mx-auto bg-white shadow-md relative">
                  <img
                    className="w-full h-auto rounded-t-[10px] object-cover"
                    src={product.image}
                    alt={product.name}
                  />
                  <div className="w-full p-[11px] bg-white rounded-b-[10px] flex justify-between items-center">
                    <div>
                      <h4 className="text-[18px] font-bold">{product.name}</h4>
                      <h4 className="text-[#848484] text-[15px] font-bold">
                        {product.subtitle}
                      </h4>
                    </div>
                    <div>
                      <h4 className="text-[16px] font-bold">{product.price} </h4>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))
          ) : (
            <p className="text-center text-gray-500 text-[18px]">Нет похожих товаров</p>
          )}
        </Swiper>
      </div>
    </>
  );
};

export default ProductPage;