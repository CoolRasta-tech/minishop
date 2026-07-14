import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { orderService } from '../services/orderService';
import Spinner from '../components/Spinner';

export default function OrderDetail() {
    const { id } = useParams();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchOrder() {
            try {
                const data = await orderService.getOrderById(id);
                setOrder(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchOrder();
    }, [id]);

    if (loading) return <Spinner />;

    if (error) return <p className="error">{error}</p>;

    if (!order) return <p>Ordine non trovato.</p>;

    return (
        <div className="order-detail-page">
            <Link to="/orders">← Torna ai miei ordini</Link>

            <h1>Ordine #{order._id}</h1>

            <p className="order-detail-date">
                Data: {new Date(order.createdAt).toLocaleDateString('it-IT')}
            </p>

            <p className={`order-status order-status--${order.status}`}>
                Stato: {order.status}
            </p>

            <div className="order-detail-items">
                {order.items.map((item) => (
                    <div key={item.product._id} className="order-detail-item">
                        <span className="order-detail-item-name">{item.product.name}</span>
                        <span className="order-detail-item-quantity"> x {item.quantity}</span>
                        <span className="order-detail-item-price">{item.priceAtOrder.toFixed(2)} € </span>
                        <span className="order-detail-item-subtotal"> {(item.priceAtOrder * item.quantity).toFixed(2)} € </span>
                    </div>
                ))}
            </div>

            <p className="order-detail-total">Totale: {order.totalPrice.toFixed(2)} €</p>
        </div>
    );
}
