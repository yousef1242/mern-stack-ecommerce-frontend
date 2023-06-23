import { useEffect, useState } from "react";
import "./productDetails.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setShopApiCall,
  setSingleProductApiCall,
} from "../../redux/apiCall/productsApiCall";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  setUserInfoApiCall,
  setWishlistForUserApiCall,
} from "../../redux/apiCall/authApiCall";
import { toast } from "react-toastify";
import ShopItem from "../../components/shopItem/ShopItem";
import { setAddToCartApiCall } from "../../redux/apiCall/cartApiCall";
import { setAddToCartForUser } from "../../redux/Slice/cartSlice";

const ProductDetails = () => {
  const [quantaty, setQuantaty] = useState(1);
  const { productName } = useParams();
  const dispatch = useDispatch();
  const { singleProduct } = useSelector((state) => state.products);
  const { shopProducts } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
    dispatch(setShopApiCall());
    dispatch(setSingleProductApiCall(productName));
    dispatch(setUserInfoApiCall(user?.id));
  }, [productName]);
  return (
    <>
      <div key={singleProduct?._id} className="product-details-page">
        <div className="container">
          <div
            className="row product-details-row w-100 m-0"
            data-aos="fade-down"
            data-aos-duration="8000"
          >
            <div className="col-12 col-md-6 images-section">
              <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
              >
                {singleProduct?.images?.map((image, index) => (
                  <SwiperSlide>
                    <img
                      style={{ objectFit: "contain", width: "200px" }}
                      src={image}
                      key={index}
                      alt=""
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div
              className="col-12 col-md-6 pt-5"
              data-aos="fade-up"
              data-aos-duration="8000"
            >
              <h3 className="mb-5">{singleProduct?.name}</h3>
              {singleProduct?.disCountPrecent > 0 ? (
                <>
                  <span className="text-decoration-line-through">
                    EGP{singleProduct?.price}
                  </span>
                  <span>
                    EGP
                    {singleProduct?.price -
                      (singleProduct?.disCountPrecent / 100) *
                        singleProduct?.price}
                  </span>
                  <span className="discount-number">
                    {singleProduct?.disCountPrecent}%
                  </span>
                </>
              ) : (
                <span>EGP{singleProduct?.price}</span>
              )}
              <div className="row mt-4 w-100 m-0">
                {!user?.isAdmin && (
                  <div className="col-12 col-md-4 mb-3">
                    <div className="quantaty-section">
                      <button
                        disabled={quantaty === 1}
                        onClick={() => setQuantaty(quantaty - 1)}
                        className="decrease"
                      >
                        -
                      </button>
                      <div className="number ms-2">
                        <input
                          style={{
                            border: "0px",
                            outline: "0px",
                            textAlign: "center",
                          }}
                          className="w-100 qty"
                          type="number"
                          min={1}
                          value={quantaty < 1 ? 1 : quantaty}
                        />
                      </div>
                      <div
                        onClick={() => setQuantaty(quantaty + 1)}
                        className="increase"
                      >
                        +
                      </div>
                    </div>
                  </div>
                )}
                <div className="col-12 col-md-8">
                  {!user?.isAdmin && (
                    <button
                      className="add-cart-btn mb-3"
                      onClick={() => {
                        if (!user) {
                          toast.warn("Please log in");
                        } else {
                          dispatch(
                            setAddToCartApiCall({
                              product: singleProduct?._id,
                              quantaty: quantaty,
                              nameProduct: singleProduct?.name,
                              imageProduct: singleProduct?.images[0],
                              priceProduct: singleProduct?.price,
                            })
                          );
                          dispatch(setAddToCartForUser(singleProduct));
                        }
                      }}
                    >
                      Add To Cart
                    </button>
                  )}
                  {!user?.isAdmin && (
                    <button
                      className="add-wishlist-btn"
                      onClick={(e) => {
                        if (!user) {
                          toast.warn("Please log in");
                        } else {
                          dispatch(
                            setWishlistForUserApiCall({
                              productId: singleProduct?._id,
                            })
                          );
                        }
                      }}
                    >
                      <i
                        style={{ cursor: "pointer" }}
                        className={
                          userInfo?.wishlist?.some(
                            (wishlist) => wishlist._id === singleProduct?._id
                          )
                            ? "fa-solid fa-heart"
                            : "fa-regular fa-heart"
                        }
                      ></i>
                      Add To Wishlist
                    </button>
                  )}{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-5" />
        <div className="container py-5">
          <h2 data-aos="fade-right" className="mb-5">
            Description
          </h2>
          <h6 style={{ color: "#777", lineHeight: "2" }} data-aos="fade-right">
            {singleProduct?.description}
          </h6>
        </div>
        <hr className="my-5" />
        <div className="container py-3">
          <h2 className="mb-5">Related Products</h2>
          {shopProducts
            .filter((id) => id.category === singleProduct?.category)
            .filter((id) => id._id !== singleProduct?._id)
            .slice(0, 3).length > 0 ? (
            <ShopItem
              shopProducts={shopProducts
                ?.slice(0, 3)
                .filter((id) => id.gender === singleProduct?.gender)
                .filter((id) => id.category === singleProduct?.category)
                .filter((id) => id._id !== singleProduct?._id)}
            />
          ) : (
            <h4 style={{ color: "#777" }}>No Products Related</h4>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
