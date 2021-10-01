import React from 'react';
import styles from '../styles.module.css';
import { useRouter } from 'next/router';

export default function PaymentSuccess() {
  const router = useRouter();
  console.log(router.query);

  return (
    <div className={styles.hello}>
      <p>Payment Success</p>
      <p>Bellow is callback data from 2C2P</p>
      <pre>{JSON.stringify(router.query, null, 2)}</pre>
    </div>
  );
}
