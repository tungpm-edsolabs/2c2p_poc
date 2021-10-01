const nextConfig = {
  /* config options here */
  env: {
    COUNTRY: process.env.COUNTRY,
    CURRENCY_CODE: process.env.CURRENCY_CODE,
    CURRENCY_NUMBER: process.env.CURRENCY_NUMBER,
    MERCHANT_ID: process.env.MERCHANT_ID,
    SECRET_KEY: process.env.SECRET_KEY,
    PAYMENT_GATEWAY_URL: process.env.PAYMENT_GATEWAY_URL,
    PAYMENT_FRONTEND_CALLBACK: process.env.PAYMENT_FRONTEND_CALLBACK,
  },
  publicRuntimeConfig: {},
};

module.exports = nextConfig;
