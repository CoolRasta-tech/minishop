import {useCart} from "../context/CartContext";

export default function CartItem({item}){
    const {updateQuantity, removeFromCart} = useCart();
    const {product, quantity} = item;

    return (
        <div className="cart-item">
            <img src={product.imageUrl} alt={product.name} className="cart-item-image" />

            <h4 className="cart-item-name">{product.name}</h4>

            <p className="cart-item-price">{product.price.toFixed(2)} €</p>

            <div className="cart-item-quantity-controls">
                <button
                    onClick={() => updateQuantity(product._id, quantity - 1)}
                    className="cart-item-qty-btn"
                    disabled={quantity <= 1}
                > - </button>

                <span className="cart-item-quantity">{quantity}</span>

                <button
                    onClick={() => updateQuantity(product._id, quantity + 1)}
                    className="cart-item-qty-btn"
                > + </button>
            </div>

            <p className="cart-item-subtotal">
                {(product.price * quantity).toFixed(2)} €
            </p>

            <button
                onClick={() => removeFromCart(product._id)}
                className="cart-item-remove-btn"
            > Rimuovi </button>
        </div>
    );
};