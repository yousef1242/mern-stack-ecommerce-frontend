import "./lineHome.css"
import discoverImage from "../../images/discover.gif"
import basketImage from "../../images/basket.gif"
import fastImage from "../../images/clock.gif"
import enjoyImage from "../../images/enjoy.gif"


const LineHome = () => {
    return ( 
        <>
            <div className="feature-section overflow-hidden w-100">
                <div className="container">
                        <div className="row">
                            <div data-aos={"fade-right"} className="col-12 col-sm-6 mb-0 mb-sm-3 col-md-3 text-center">
                                <img src={discoverImage} alt="" />
                                <h5>Filter & Discover</h5>
                            </div>
                            <div data-aos={"fade-right"} className="col-12 col-sm-6 mb-0 mb-sm-3 col-md-3 text-center">
                                <img src={basketImage} alt="" />
                                <h5>Add to bag</h5>
                            </div>
                            <div data-aos={"fade-left"} className="col-12 col-sm-6 mb-0 mb-sm-3 col-md-3 text-center">
                                <img src={fastImage} alt="" />
                                <h5>Fast shipping</h5>
                            </div>
                            <div data-aos={"fade-left"} className="col-12 col-sm-6 mb-0 mb-sm-3 col-md-3 text-center">
                                <img src={enjoyImage} alt="" />
                                <h5>Enjoy the product</h5>
                            </div>
                        </div>
                </div>
            </div>
        </>
     );
}
 
export default LineHome;