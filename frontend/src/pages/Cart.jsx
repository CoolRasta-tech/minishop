import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';

export default function Cart() {
    const { items, cartTotal } = useCart();

    return (
        <div className="cart-page">
            <h1>Il tuo carrello</h1>

            {items.length === 0 ? (
                <p>Il carrello è vuoto.</p>
            ) : (
                <>
                    <div className="cart-items-list">
                        {items.map((item) => (
                            <CartItem key={item.product._id} item={item} />
                        ))}
                    </div>

                    <div className="cart-summary">
                        <p className="cart-total">
                            Totale: {cartTotal.toFixed(2)} €
                        </p>

                        <Link to="/checkout" className="checkout-btn">
                            Vai al checkout
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}