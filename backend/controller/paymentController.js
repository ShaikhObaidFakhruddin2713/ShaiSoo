const Razorpay = require('razorpay');
const crypto = require('crypto');

const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({
        message: 'Valid amount is required'
      });
    }

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    const options = {
      amount: Math.round(Number(amount) * 100),
      currency: 'INR',
      receipt: `receipt_${Date.now()}`
    };

    const order = await instance.orders.create(options);

    return res.status(200).json(order);

  } catch (error) {
    console.log('Create Razorpay order error:', error);

    return res.status(500).json({
      message: error.message
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        message: 'Payment details are missing'
      });
    }

    const sign = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest('hex');

    if (razorpay_signature !== expectedSign) {
      return res.status(400).json({
        message: 'Invalid payment signature'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Payment verified successfully'
    });

  } catch (error) {
    console.log('Payment verification error:', error);

    return res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  createOrder,
  verifyPayment
};