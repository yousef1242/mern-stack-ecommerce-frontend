import { Link } from "react-router-dom";
import "./shopItem.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setWishlistForUserApiCall } from "../../redux/apiCall/authApiCall";

const ShopItem = ({ shopProducts, grid }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { userInfo } = useSelector((state) => state.auth);
  // const [secondImage, setSecondImage] = useState();
  return (
    <>
      <div className="shop-item">
        <div className="row">
          {shopProducts?.map((product, index) => (
            <div
              key={product?._id}
              className={`mb-5 ${grid ? "col-6 col-md-3" : "col-12 col-md-4"}`}
            >
              <Link to={`/products/${product.name}`} className="image-section">
                <img src={product?.images[0]} alt="" />
                {product?.disCountPrecent > 0 && (
                  <span>-{product?.disCountPrecent}%</span>
                )}
              </Link>
              <div className="product-info-section">
                <div className="row m-0 w-100">
                  <div className="col-8">
                    <p>{product?.name.slice(0,40)}...</p>
                  </div>
                  {!user?.isAdmin && (
                    <div className="col-4 text-center">
                      <i
                        onClick={(e) => {
                          if (!user) {
                            toast.warn("Please log in");
                          } else {
                            dispatch(
                              setWishlistForUserApiCall({
                                productId: product?._id,
                              })
                            );
                          }
                        }}
                        style={{ cursor: "pointer" }}
                        className={
                          userInfo?.wishlist?.some(
                            (wishlist) => wishlist._id === product?._id
                          )
                            ? "fa-solid fa-heart"
                            : "fa-regular fa-heart"
                        }
                      ></i>
                    </div>
                  )}
                  <div className="col-12 price-section">
                    {product?.disCountPrecent > 0 ? (
                      <>
                        <span className="text-decoration-line-through">
                          EGP{product?.price}
                        </span>
                        <span>
                          EGP
                          {product?.price -
                            (product?.disCountPrecent / 100) * product?.price}
                        </span>
                      </>
                    ) : (
                      <span>EGP{product?.price}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShopItem;
