import { createContext, useContext, useState, useEffect, useMemo } from "react";

const CartContext = createContext(null);

export function CartProvider({children}) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedItems = localStorage.getItem('minishop_cart');

        if (storedItems) {
            try {
                setItems(JSON.parse(storedItems));
            } catch {
                localStorage.removeItem('minishop_cart');
            }
        }

        setLoading(false);
    }, []);

    useEffect(() => {
        if (!loading) {
            localStorage.setItem('minishop_cart', JSON.stringify(items));
        }
    }, [items, loading]);

    function addToCart(product, quantity = 1) {
        setItems(prev => {
            const existing = prev.find(item => item.product._id === product._id);

            if (existing) {
                return prev.map(item =>
                    item.product._id === product._id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, {product, quantity}];
        });
    }

    function removeFromCart(productId) {
        setItems(prev => prev.filter(item => item.product._id !== productId));
    }

    function updateQuantity(productId, quantity) {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        setItems(prev => 
            prev.map(item => 
                item.product._id === productId 
                ? {...item, quantity} 
                : item)
        );
    }

    function clearCart() {
        setItems([]);
    }

    const cartTotal = useMemo(
        () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
        [items]
    );

    const cartCount = useMemo(
        () => items.reduce((sum, item) => sum + item.quantity, 0),
        [items]
    );

    return (
        <CartContext.Provider
            value={{
                items,
                loading,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartTotal,
                cartCount
            }} >
                
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) {
        throw new Error('useCart deve essere usato dentro un CartProvider');
    }
    return ctx;
}