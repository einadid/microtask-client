import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../../../components/Payment/CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { coins, price } = location.state || {};

    if (!coins || !price) {
        navigate('/dashboard/purchase-coin');
        return null;
    }

    return (
        <div className="max-w-lg mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    Complete Payment
                </h2>

                {/* Order Summary */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Coins</span>
                        <span className="font-semibold">{coins}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                        <span className="text-gray-600">Total</span>
                        <span className="text-xl font-bold text-indigo-600">${price}</span>
                    </div>
                </div>

                {/* Stripe Checkout Form */}
                <Elements stripe={stripePromise}>
                    <CheckoutForm coins={coins} price={price} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;