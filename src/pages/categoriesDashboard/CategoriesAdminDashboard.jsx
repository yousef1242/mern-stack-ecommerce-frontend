import { useDispatch, useSelector } from "react-redux";
import "./CategoriesAdminDashboard.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  setAllCategoriesApiCall,
  setDeleteCategoryApiCall,
} from "../../redux/apiCall/categoriesApiCall";
import Table from "react-bootstrap/Table";
import { setDeleteCategory } from "../../redux/Slice/categoriesSlice";

const CategoriesAdminDashboard = () => {
  const dispatch = useDispatch();
  const { allCategories } = useSelector((state) => state.categories);
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
    const fetchCategories = async () => {
      await dispatch(setAllCategoriesApiCall());
    };
    fetchCategories();
  }, [dispatch, user]);
  return (
    <>
      <div className="categories-dashboard">
        <h1 className="fw-bold text-center" style={{ marginBottom: "100px" }}>
          All categories
        </h1>
        <div className="container">
          {allCategories?.length > 0 ? (
            <Table style={{ textAlign: "center" }} striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>CATEGORY</th>
                  <th>GENDER</th>
                  <th>DATE</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {allCategories?.map((cat, index) => {
                  return (
                    <tr key={index + 1}>
                      <td>{index + 1}</td>
                      <td>{cat?.title}</td>
                      <td>{cat?.gender}</td>
                      <td>
                        {new Date(cat.createdAt).toLocaleString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            dispatch(setDeleteCategory(cat));
                            dispatch(setDeleteCategoryApiCall(cat?._id));
                          }}
                          style={{
                            padding: "5px",
                            border: "0px",
                            outline: "none",
                            color: "#fff",
                            background: "red",
                            borderRadius: "5px",
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
            <h1 className="fw-bold">No categories</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoriesAdminDashboard;
