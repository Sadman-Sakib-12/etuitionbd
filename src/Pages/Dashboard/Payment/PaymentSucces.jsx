import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "react-router";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')
  console.log(sessionId)
  useEffect(() => {
    if (sessionId) {
      axios.post(`${import.meta.env.VITE_API_URL}/payment-success`, {
        sessionId,
      })
    }
  }, [sessionId])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="bg-white shadow-lg rounded-2xl p-12 max-w-md text-center animate-fadeIn">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-3xl font-bold text-green-700 mb-4">
          Payment Successful!
        </h1>
        <button
          className="mt-8 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-transform transform hover:scale-105"
          onClick={() => window.location.href = '/dashboard'}
        >
          Go to Dashboard
        </button>
      </div>
    </div>

  );
};

export default PaymentSuccess;