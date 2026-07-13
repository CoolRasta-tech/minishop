import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { orderService } from '../services/orderService';

export default function Checkout() {
    const { items, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    async function handleConfirmOrder() {
        setSubmitting(true);
        setError('');

        try {
            const orderItems = items.map((item) => ({
                product: item.product._id,
                quantity: item.quantity,
            }));

            await orderService.createOrder(orderItems);
            clearCart();
            navigate('/orders');
        } catch (err) {
            setError(err.message);
            setSubmitting(false);
        }
    }

    if (items.length === 0) {
        return <p>Il carrello è vuoto</p>;
    }

    return (
        <div className="checkout-page">
            <h1>Riepilogo ordine</h1>

            <div className="checkout-summary">
                {items.map((item) => (
                    <div key={item.product._id} className="checkout-item">
                        <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className="checkout-item-image"
                        />
                        <span className="checkout-item-name">{item.product.name}</span>
                        <span className="checkout-item-quantity">x{item.quantity}</span>
                        <span className="checkout-item-subtotal">
                            {(item.product.price * item.quantity).toFixed(2)} €
                        </span>
                    </div>
                ))}
            </div>

            <p className="checkout-total">Totale: {cartTotal.toFixed(2)} €</p>

            {error && <p className="error">{error}</p>}

            <button
                onClick={handleConfirmOrder}
                disabled={submitting}
                className="confirm-order-btn"
            >
                {submitting ? 'Conferma in corso...' : 'Conferma ordine'}
            </button>
        </div>
    );
}