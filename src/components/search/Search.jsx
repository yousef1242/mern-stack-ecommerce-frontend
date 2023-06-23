import { useNavigate, useSearchParams } from "react-router-dom";
import "./search.css";
import { Offcanvas } from "react-bootstrap";
import { useState } from "react";

const Search = ({ setShow, show }) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [input, setInput] = useState('')
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const formSubmitHandler = (e) => {
    e.preventDefault();
    setSearchParams({ search: input })
    navigate(`/shop/search?search=${input}`);
    setShow(false)
  };
  return (
    <>
      <Offcanvas show={show} onHide={handleClose} placement="top">
        <Offcanvas.Header closeButton></Offcanvas.Header>
        <Offcanvas.Body className="search-body">
          <form onSubmit={formSubmitHandler}>
            <input onChange={(e) => setInput(e.target.value)} type="search" placeholder="Search Products..." />
          </form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Search;
