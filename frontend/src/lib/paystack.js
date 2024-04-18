// usePaystackPayment.js

import { usePaystackPayment as usePaystack } from "react-paystack";

// const PAYSTACK_KEY =
//   process.env.PAYSTACK_KEY ||
//   "pk_test_5625e87690fa343ff6ec90871ef1fbaf2b9f5992";

const usePaystackPayment = (config) => {
  const initializePayment = usePaystack(config);

  return initializePayment;
};

export default usePaystackPayment;
