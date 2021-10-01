import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import styles from '../styles.module.css';

export default function Home() {
  const invoiceNo = uuidv4();
  const paymentTokenPayload = {
    merchantID: process.env.MERCHANT_ID,
    invoiceNo: invoiceNo,
    description: 'item 1',
    amount: 1000.0,
    currencyCode: process.env.CURRENCY_CODE,
    paymentChannel: ['CC'], //Specify which payment option
    frontendReturnUrl: process.env.PAYMENT_FRONTEND_CALLBACK,
  };
  async function handleProcessPayment() {
    try {
      console.log('calling api to initiate transaction');
      const {
        data: { paymentToken, webPaymentUrl },
      } = await axios.post('/api/payment/initiate', paymentTokenPayload);

      console.log('initiate dont, prepare to redirect');

      window.location.href = webPaymentUrl;
    } catch (ex) {
      console.error(ex);
    }
  }

  return (
    <div className={styles.hello}>
      <p>
        Hello, this is a POC to demonstrate the integrations between our website
        and 2C2P use redirect flow
      </p>
      <p>following data will be sent to 2C2P server</p>
      <pre className={styles.json}>
        {JSON.stringify(paymentTokenPayload, null, 2)}
      </pre>

      <button onClick={handleProcessPayment}>Process Payment</button>
    </div>
  );
}
