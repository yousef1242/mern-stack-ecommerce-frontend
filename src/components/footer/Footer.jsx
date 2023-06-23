import { Link } from "react-router-dom";
import "./footer.css";
import paymentImage from "../../images/Bam_Pay_1-removebg-preview.png"

const Footer = () => {
  return (
    <>
      <div className="footer-section">
        <div className="container mb-4">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-4 mb-3 mb-lg-0">
              <h4>COMPANY</h4>
              <Link to={`/`}>Home</Link>
              <Link to={`/about`}>About</Link>
            </div>
            <div className="col-12 col-md-6 col-lg-4 mb-3 mb-lg-0">
              <h4>SHOP NOW</h4>
              <Link to={`/shop`}>All Produts</Link>
              <Link to={`/shop?gender=men`}>Men</Link>
              <Link to={`/shop?gender=women`}>Women</Link>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <h4>Payment Methods</h4>
              <img
                src={paymentImage}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="second-footer text-center py-4">
          © Developed by Yousef Ahmed
        </div>
      </div>
    </>
  );
};

export default Footer;
