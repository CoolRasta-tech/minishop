import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { orderService } from '../services/orderService';
import Spinner from '../components/Spinner';

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchOrders() {
            try {
                const data = await orderService.getUserOrders();
                setOrders(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchOrders();
    }, []);

    if (loading) return <Spinner />;

    if (error) return <p className="error">{error}</p>;

    return (
        <div className="orders-page">
            <h1>I miei ordini</h1>

            {orders.length === 0 ? (
                <p>Non hai ancora effettuato ordini.</p>
            ) : (
                <div className="orders-list">
                    {orders.map((order) => (
                        <Link
                            key={order._id}
                            to={`/orders/${order._id}`}
                            className="order-row">
                            <span className="order-date">
                                {new Date(order.createdAt).toLocaleDateString('it-IT')}
                            </span>
                            <span className="order-total">
                                {order.totalPrice.toFixed(2)} €
                            </span>
                            <span className={`order-status order-status--${order.status}`}>
                                {order.status}
                            </span>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}