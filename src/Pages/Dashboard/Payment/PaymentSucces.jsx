import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "react-router";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')
  useEffect(() => {
    if (sessionId) {
      axios.post(`${import.meta.env.VITE_API_URL}/payment-success`, {
        sessionId,
      })
    }
  }, [sessionId])
  

  return (
    <div className="p-10 text-center text-green-600 text-3xl">
      🎉 Payment Successful! Tutor Approved.
    </div>
  );
};

export default PaymentSuccess;
