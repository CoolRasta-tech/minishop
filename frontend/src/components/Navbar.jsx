import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import {useCart} from '../context/CartContext';
import {useWishlist} from '../context/WishlistContext';

export default function Navbar(){
    const {user, logout} = useAuth();
    const {cartCount, clearCart} = useCart();
    const {wishlistCount} = useWishlist();
    const navigate = useNavigate();

    function handleLogout(){
        logout();
        clearCart();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="nav-left">
                <Link to="/" className="nav-logo">Minishop 🛒</Link>
                <Link to="/" className="nav-link">Catalogo</Link>

                {user && (
                    <>
                        <Link to="/wishlist" className="nav-link">
                            Wishlist
                            {wishlistCount > 0 && <span className='wishlist-badge'> - {wishlistCount}</span>}
                            </Link>
                        <Link to="/orders" className="nav-link">Ordini</Link>
                    </>
                )}
            </div>

            <div className="nav-right">
                <Link to="/cart" className="nav-link">
                    Carrello
                    {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                </Link>

                {user?.role === 'admin' && (
                    <Link to="/admin/products" className="nav-link-admin">Admin</Link>
                )}

                {user ? (
                    <div className="user-section">
                        <div className="user-avatar">
                            {user.username?.charAt(0).toUpperCase()}
                        </div>
                        <button onClick={handleLogout} className="logout-btn">Esci</button>
                    </div>
                ) : (
                    <>
                        <Link to="/login" className="nav-link">Accedi</Link>
                        <Link to="/register" className="nav-link">Registrati</Link>
                    </>
                )}
            </div>
        </nav>
    );
};