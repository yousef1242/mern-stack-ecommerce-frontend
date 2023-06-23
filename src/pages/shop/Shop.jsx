import { useEffect, useState } from "react";
import "./shop.css";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setShopApiCall } from "../../redux/apiCall/productsApiCall";
import ShopItem from "../../components/shopItem/ShopItem";
import { setUserInfoApiCall } from "../../redux/apiCall/authApiCall";

const ShopPage = () => {
  const [grid, setGrid] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [seacrhParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { shopProducts } = useSelector((state) => state.products);
  useEffect(() => {
    window.scrollTo({
      top : 0,
      behavior : "instant"
    })
    dispatch(setUserInfoApiCall(user?.id));
    dispatch(
      setShopApiCall(seacrhParams.get("gender"), seacrhParams.get("category"))
    );
  }, [seacrhParams]);
  return (
    <>
      <div className="shop-page">
        <div className="container">
          <h2
            className="text-center mb-5 fw-bold"
            style={{ textTransform: "uppercase" }}
          >
            {seacrhParams.get("gender") && seacrhParams.get("category")
              ? seacrhParams.get("gender") + " > "
              : ""}
            {seacrhParams.get("category")
              ? seacrhParams.get("category")
              : "Shop" &&
                !seacrhParams.get("category") &&
                seacrhParams.get("gender")
              ? seacrhParams.get("gender")
              : "Shop"}
          </h2>
          <div className="filter-section">
            <div className="row w-100 m-0">
              <div className="col-6 link-section">
                <Link to={`/`}>Home</Link> / <Link to={`/shop`}>Shop</Link>
                {" > "}
                {seacrhParams.get("shop") && seacrhParams.get("shop")}
              </div>
              <div className="col-6 text-end">
                <i
                  onClick={() => setGrid(false)}
                  class="fa-solid fa-border-all"
                ></i>
                <i
                  onClick={() => setGrid(true)}
                  class="fa-solid fa-table-cells"
                ></i>
              </div>
            </div>
          </div>
          {shopProducts?.length > 0 ? (
            <ShopItem grid={grid} shopProducts={shopProducts} />
          ) : (
            <h1 className="mt-5">No Products</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default ShopPage;
