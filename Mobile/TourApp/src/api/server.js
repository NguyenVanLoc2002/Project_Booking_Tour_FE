const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

// Lấy thông tin Client ID và Secret từ PayPal Developer
const CLIENT_ID = 'AZUX4JxpgUbsBMZlbHYkrocFL8WrbXkSpU5Kt0VLGboGAkr7w-JMbo5PqVi-LelRRnWrOshQUoWXTO_W';
const CLIENT_SECRET = 'EAhotxO3gijn7KLc-FiryyAVuyMT5oeAAzK8VdBko06_WlXJ8Uvf03w0ED315ZgQVnXejy0fuyj-qyBI';
const PAYPAL_API = 'https://api.sandbox.paypal.com'; // Dùng sandbox cho thử nghiệm

app.use(bodyParser.json());

// Lấy token OAuth2 từ PayPal
const getAccessToken = async () => {
  const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
  const response = await axios.post(
    `${PAYPAL_API}/v1/oauth2/token`,
    'grant_type=client_credentials',
    {
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
  return response.data.access_token;
};

// Tạo Order thanh toán trên PayPal
app.post('/create-payment', async (req, res) => {
  const accessToken = await getAccessToken();

  const paymentData = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal',
    },
    transactions: [
      {
        amount: {
          total: '10.00', // Thay đổi số tiền thanh toán
          currency: 'USD',
        },
        description: 'Thanh toán qua PayPal',
      },
    ],
    redirect_urls: {
      return_url: 'http://localhost:5000/success',  // URL thành công
      cancel_url: 'http://localhost:5000/cancel',    // URL hủy bỏ
    },
  };

  const response = await axios.post(`${PAYPAL_API}/v1/payments/payment`, paymentData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  res.send(response.data);
});

// Xử lý kết quả thanh toán sau khi thành công
app.get('/success', (req, res) => {
  res.send('Thanh toán thành công');
});

// Xử lý nếu người dùng hủy thanh toán
app.get('/cancel', (req, res) => {
  res.send('Thanh toán bị hủy');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
