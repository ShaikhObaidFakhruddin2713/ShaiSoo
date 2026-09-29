import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { clearCart } from '../redux/cartSlice';

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: '',
    street: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const [loading, setLoading] = useState(false);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const handlePayment = async () => {
    if (!user?.token) {
      alert('Please login first');
      navigate('/login');
      return;
    }

    if (!window.Razorpay) {
      alert('Razorpay is not loaded');
      return;
    }

    setLoading(true);

    try {
      const orderRes = await fetch('/api/payments/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({
          amount: totalPrice
        })
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        throw new Error(
          orderData.message || 'Unable to create Razorpay order'
        );
      }

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'ShaiSoo',
        description: 'ShaiSoo Order',
        order_id: orderData.id,

        handler: async function (response) {
          try {
            const verifyRes = await fetch('/api/payments/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
              },
              body: JSON.stringify(response)
            });

            const verifyData = await verifyRes.json();

            if (!verifyRes.ok) {
              throw new Error(
                verifyData.message || 'Payment verification failed'
              );
            }

            const saveOrderRes = await fetch('/api/orders', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
              },
              body: JSON.stringify({
                items: cartItems,
                totalAmount: totalPrice,
                address,
                paymentId: response.razorpay_payment_id
              })
            });

            const saveOrderData = await saveOrderRes.json();

            if (!saveOrderRes.ok) {
              throw new Error(
                saveOrderData.message || 'Order saving failed'
              );
            }

            dispatch(clearCart());
            navigate('/ordersuccess');

          } catch (error) {
            console.error('Payment verification error:', error);
            alert(error.message);
          }
        },

        prefill: {
          name: address.fullName,
          email: user.email,
          contact: '9999999999'
        },

        theme: {
          color: '#F2C143'
        },

        modal: {
          ondismiss: function () {
            setLoading(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on('payment.failed', function (response) {
        console.error('Razorpay payment failed:', response.error);

        alert(
          response.error?.description ||
          'Payment failed'
        );

        setLoading(false);
      });

      razorpay.open();

    } catch (error) {
      console.error('Payment error:', error);
      alert(error.message);
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      alert('Please login first');
      navigate('/login');
      return;
    }

    handlePayment();
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <div className="checkout-content">
        <form
          onSubmit={handleSubmit}
          className="shipping-form"
        >
          <h3>Shipping Address</h3>

          <input
            type="text"
            placeholder="Full Name"
            required
            value={address.fullName}
            onChange={(e) =>
              setAddress({
                ...address,
                fullName: e.target.value
              })
            }
          />

          <input
            type="text"
            placeholder="Street"
            required
            value={address.street}
            onChange={(e) =>
              setAddress({
                ...address,
                street: e.target.value
              })
            }
          />

          <input
            type="text"
            placeholder="City"
            required
            value={address.city}
            onChange={(e) =>
              setAddress({
                ...address,
                city: e.target.value
              })
            }
          />

          <input
            type="text"
            placeholder="Postal Code"
            required
            value={address.postalCode}
            onChange={(e) =>
              setAddress({
                ...address,
                postalCode: e.target.value
              })
            }
          />

          <input
            type="text"
            placeholder="Country"
            required
            value={address.country}
            onChange={(e) =>
              setAddress({
                ...address,
                country: e.target.value
              })
            }
          />

          <div className="checkout-summary">
            <h4>
              Total to Pay: ₹{totalPrice.toFixed(2)}
            </h4>

            <button
              type="submit"
              className="btn"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Pay Now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;