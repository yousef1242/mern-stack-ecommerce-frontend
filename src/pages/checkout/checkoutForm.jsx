import { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import LoadingAnimation from "../../components/loading/Loading";
import { CardElement } from "@stripe/react-stripe-js";

const CheckOutForm = ({
  formCashSubmitHandler,
  cashLoading,
  formCreditSubmitHandler,
  visaLoading,
}) => {
  const [payMethod, setPayMethod] = useState("cash");
  return (
    <form>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header
            onClick={() => {
              setPayMethod("cash");
            }}
          >
            <label htmlFor="cash">Cash</label>
            <input
              onClick={() => setPayMethod("cash")}
              value="cash"
              checked={payMethod === "cash"}
              type="radio"
              id="cash"
              name="payment-method"
              className="cash-input d-none"
            />
          </Accordion.Header>
          <Accordion.Body>Pay with cash</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header
            onClick={() => {
              setPayMethod("credit");
            }}
          >
            <label htmlFor="credit">Credit</label>
            <input
              onClick={() => setPayMethod("credit")}
              type="radio"
              id="credit"
              value="credit"
              checked={payMethod === "credit"}
              name="payment-method"
              className="credit-input d-none"
            />
          </Accordion.Header>
          <Accordion.Body>
            <CardElement />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      {payMethod === "cash" ? (
        <button
          disabled={cashLoading}
          onClick={formCashSubmitHandler}
          type="submit"
          className="check-out-processed position-relative"
        >
          {!cashLoading && "Place order"} {cashLoading && <LoadingAnimation />}
        </button>
      ) : (
        <button
          type="submit"
          onClick={formCreditSubmitHandler}
          className="check-out-processed"
          disabled={visaLoading && true}
        >
          {!visaLoading && "Pay"} {visaLoading && <LoadingAnimation />}
        </button>
      )}
    </form>
  );
};

export default CheckOutForm;
