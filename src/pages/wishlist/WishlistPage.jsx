import { useEffect } from "react";
import "./wishlist.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setSingleUserApiCall,
  setWishlistForUserApiCall,
} from "../../redux/apiCall/authApiCall";
import { useNavigate, useParams } from "react-router-dom";
import { setFilterWishlist } from "../../redux/Slice/authSlice";

const WishlistPage = () => {
  const { userName } = useParams();
  const dispatch = useDispatch();
  const { singleUser } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user || user?.username !== userName) {
      navigate("/");
    }
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
    dispatch(setSingleUserApiCall(userName));
  }, [userName]);
  return (
    <>
      <div className="wishlist-page">
        <h1 className="fw-bold text-center">My wishlist</h1>
        <div className="container">
          <div className="row m-0 w-100">
            {singleUser?.wishlist.length > 0 ? (
              singleUser?.wishlist?.map((wishlist) => (
                <>
                  <div key={wishlist._id} className="col-12">
                    <div className="row m-0 w-100">
                      <div className="col-6 col-md-2 d-flex justify-content-center mb-3 mb-mg-0">
                        <img
                          src={wishlist?.images[0] && wishlist?.images[0]}
                          alt=""
                        />
                      </div>
                      <div className="col-6 col-md-4 mb-3 mb-mg-0">
                        {wishlist?.name}
                      </div>
                      <div className="col-6 col-md-3 text-center text-md-start">
                        {wishlist?.disCountPrecent > 0 ? (
                          <>
                            <span className="text-decoration-line-through d-block">
                              EGP{wishlist?.price}
                            </span>
                            <span>
                              EGP
                              {wishlist?.price - (wishlist?.disCountPrecent / 100) *
                                wishlist?.price}
                            </span>
                          </>
                        ) : (
                          <span className="wish-product-price">
                            EGP{wishlist?.price}
                          </span>
                        )}
                      </div>
                      <div className="col-6 col-md-3 text-center text-md-start">
                        <i
                          onClick={() => {
                            dispatch(
                              setWishlistForUserApiCall({
                                productId: wishlist?._id,
                              })
                            );
                            dispatch(setFilterWishlist(wishlist));
                          }}
                          className="fa-solid fa-xmark"
                        ></i>
                      </div>
                    </div>
                  </div>
                  <hr className="mt-4 mb-4" />
                </>
              ))
            ) : (
              <h1>No wishlist</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default WishlistPage;
