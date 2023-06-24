import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Table from "react-bootstrap/esm/Table";
import "./productsAdminDashboard.css";
import {
  setAllProductsApiCall,
  setDeleteProductApiCall,
} from "../../redux/apiCall/productsApiCall";

const ProductsAdminDashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);
  const { adminName } = useParams();
  const navigate = useNavigate();
  if (!user || user?.username !== adminName) {
    navigate("/");
  }
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
    const fetchOrders = async () => {
      await dispatch(setAllProductsApiCall());
    };
    fetchOrders();
  }, [dispatch, user]);
  return (
    <>
      <div className="products-admin-dahsboard">
        <h1 className="fw-bold text-center" style={{ marginBottom: "100px" }}>
          All products
        </h1>
        <div className="container">
          {products?.length > 0 ? (
            <Table style={{ textAlign: "center" }} striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>IMAGE</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>DISCOUNT</th>
                  <th>CATEGORY</th>
                  <th>GENDER</th>
                  <th>DATE</th>
                  <th>UPDATE</th>
                  <th>DELETE</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product, index) => {
                  return (
                    <tr key={index + 1}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "contain",
                          }}
                          src={product?.images[0]}
                          alt=""
                        />
                      </td>
                      <td>{product?.name}</td>
                      <td>EGP{product?.price}</td>
                      <td>{product?.disCountPrecent}%</td>
                      <td>{product?.category}</td>
                      <td>{product?.gender}</td>
                      <td>
                        {new Date(product?.createdAt).toLocaleString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td>
                        <button
                          style={{
                            padding: "5px",
                            borderRadius: "3px",
                            border: "0px",
                            background: "green",
                            color: "#fff",
                          }}
                        >
                          <Link
                            style={{ color: "#fff", textDecoration: "none" }}
                            to={`/products/${product?.name}/update`}
                          >
                            Update
                          </Link>
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            dispatch(setDeleteProductApiCall(product?._id));
                          }}
                          style={{
                            padding: "5px",
                            borderRadius: "3px",
                            border: "0px",
                            background: "red",
                            color: "#fff",
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <h1 className="fw-bold">No products</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductsAdminDashboard;
