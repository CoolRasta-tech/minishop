import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';

export default function Wishlist() {
    const { wishlist, loading } = useWishlist();

    if (loading) return <Spinner />;

    return (
        <div className="wishlist-page">
            <h1>I miei preferiti</h1>

            {wishlist.length === 0 ? (
                <p>Non hai ancora aggiunto prodotti ai preferiti.</p>
            ) : (
                <div className="product-grid">
                    {wishlist.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}