import jwt from 'jsonwebtoken';
import axios from 'axios';

export default function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return handlePost(req, res);
    default:
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}

async function handlePost(req, res) {
  const { body: paymentData } = req;
  const secret = process.env.SECRET_KEY;

  const token = jwt.sign(paymentData, secret, {
    algorithm: 'HS256',
  });

  try {
    const endpoint = process.env.PAYMENT_GATEWAY_URL + '/PaymentToken';

    console.log(`call api to ${endpoint} with payload = ${token}`);
    const {
      data: { payload },
    } = await axios.post(endpoint, {
      payload: token,
    });

    const { respCode, respDesc, paymentToken, webPaymentUrl } = jwt.verify(
      payload,
      secret
    );

    if (respCode !== '0000') {
      console.log(`error: ${respDesc}`);
      return res.status(400).json({
        code: respCode,
        message: respDesc,
      });
    }

    return res.status(200).json({ paymentToken, webPaymentUrl });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
