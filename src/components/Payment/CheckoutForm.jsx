import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import useUserData from '../../hooks/useUserData';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const CheckoutForm = ({ coins, price }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const { refetch } = useUserData();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setProcessing(true);
        setError('');

        try {
            // Create payment intent
            const { data } = await axiosSecure.post('/api/payments/create-payment-intent', {
                amount: price * 100 // Convert to cents
            });

            const { clientSecret } = data;

            // Confirm payment
            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
                clientSecret,
                {
                    payment_method: {
                        card: elements.getElement(CardElement),
                        billing_details: {
                            email: user.email,
                            name: user.displayName
                        }
                    }
                }
            );

            if (confirmError) {
                setError(confirmError.message);
                setProcessing(false);
                return;
            }

            if (paymentIntent.status === 'succeeded') {
                // Save payment to database
                const paymentData = {
                    buyer_email: user.email,
                    buyer_name: user.displayName,
                    amount: price,
                    coins_purchased: coins,
                    transactionId: paymentIntent.id,
                    payment_date: new Date()
                };

                await axiosSecure.post('/api/payments', paymentData);

                // Add coins to user
                await axiosSecure.patch(`/api/users/add-coin/${user.email}`, {
                    coin: coins
                });

                toast.success(`Successfully purchased ${coins} coins!`);
                refetch();
                navigate('/dashboard/payment-history');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="border border-gray-300 rounded-lg p-4 mb-4">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4'
                                }
                            },
                            invalid: {
                                color: '#9e2146'
                            }
                        }
                    }}
                />
            </div>

            {error && (
                <p className="text-red-500 text-sm mb-4">{error}</p>
            )}

            <button
                type="submit"
                disabled={!stripe || processing}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition disabled:opacity-50"
            >
                {processing ? 'Processing...' : `Pay $${price}`}
            </button>

            {/* Test Card Info */}
            <div className="mt-4 p-4 bg-yellow-50 rounded-lg text-sm">
                <p className="font-semibold text-yellow-800 mb-2">Test Card Details:</p>
                <p className="text-yellow-700">Card: 4242 4242 4242 4242</p>
                <p className="text-yellow-700">Expiry: Any future date</p>
                <p className="text-yellow-700">CVC: Any 3 digits</p>
            </div>
        </form>
    );
};

export default CheckoutForm;