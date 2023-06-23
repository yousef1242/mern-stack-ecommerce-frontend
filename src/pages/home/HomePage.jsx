import { useEffect } from "react";
import CardHome from "../../components/cardsHome/CardsHome";
import LineHome from "../../components/lineHome/LineHome";
import "./homePage.css";
import { useDispatch, useSelector } from "react-redux"
import { setAllProductsApiCall } from "../../redux/apiCall/productsApiCall";
import SliderProducts from "../../components/SliderProducts/SliderProducts";



const HomePage = () => {
  const dispatch = useDispatch();
  const { products } = useSelector(state => state.products);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
    dispatch(setAllProductsApiCall());
  },[])
  return (
    <>
      <div className="home-page py-5 w-100">
        <CardHome />
        <LineHome/>
        <SliderProducts products={products.slice(0,10)}/>
      </div>
    </>
  );
};

export default HomePage;
