import { Link } from "react-router-dom";
import "./SliderProducts.css";

const SliderProducts = ({ products }) => {
  return (
    <>
      <div className="slider-section py-5">
        <h2 className="text-center fw-bold mb-5">New products</h2>
        <div className="container">
          <div className="row m-0 w-100">
            {products?.map((product) => (
              <Link
                data-aos="fade-up"
                key={product?._id}
                to={`/products/${product?.name}`}
                className="col-12 col-md-4 mb-md-0 mb-4"
              >
                <div className="image-div">
                  <img src={product?.images[0]} alt="" />
                </div>
                <div className="info-product">
                  <p>{product?.name}</p>
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
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SliderProducts;
