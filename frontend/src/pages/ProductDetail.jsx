import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { productService } from '../services/productService';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import Spinner from '../components/Spinner';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await productService.getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  function handleAddToCart() {
    addToCart(product, quantity);
    navigate('/cart');
  }

  async function handleWishlistClick() {
    try {
      await toggleWishlist(product);
    } catch (err) {
      console.error('Errore wishlist', err);
    }
  }

  if (loading) return <Spinner />;

  if (error) return <p className="error">{error}</p>;

  if (!product) return <p>Prodotto non trovato.</p>;

  return (
    <div className="product-detail">
      <Link to="/">← Torna al catalogo</Link>

      <div className="product-detail-content">
        <img src={product.imageUrl} alt={product.name} className="product-detail-image" />

        <div className="product-detail-info">
          <div className="product-detail-header">
            <h1>{product.name}</h1>
            <button onClick={handleWishlistClick} className="wishlist-btn">
              {isInWishlist(product._id) ? '♥' : '♡'}
            </button>
          </div>

          {product.category && <p className="product-detail-category">{product.category}</p>}

          <p className="product-detail-description">{product.description}</p>

          <p className="product-detail-price">{product.price.toFixed(2)} €</p>

          <p className="product-detail-stock">
            {product.stock > 0 ? `Disponibili: ${product.stock}` : 'Esaurito'}
          </p>

          <div className="quantity-selector">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
              disabled={quantity >= product.stock}
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="add-to-cart-btn"
          >
            Aggiungi al carrello
          </button>
        </div>
      </div>
    </div>
  );
}