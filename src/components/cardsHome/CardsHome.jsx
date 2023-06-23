import "./cardsHome.css";
import { Link } from "react-router-dom";

const CardHome = () => {
  return (
    <>
      <section className="card-section w-100 overflow-hidden">
        <div className="container">
          <div className="row m-0 w-100">
            <div data-aos={"fade-right"} data-aos-duration="1000" className="col-12 col-md-6 mb-3 mb-md-0">
              <div className="card gray-bg">
                <div className="card-body">
                  <h5>Women collection</h5>
                  <Link className="black-bg" to={`/shop?gender=women`}>Shop now</Link>
                </div>
              </div>
            </div>
            <div data-aos={"fade-left"} data-aos-duration="1000" className="col-12 col-md-6">
              <div className="card blue-bg">
                <div className="card-body">
                  <h5>Men collection</h5>
                  <Link className="white-bg" to={`/shop?gender=men`}>Shop now</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CardHome;
