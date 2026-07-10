import {Link} from 'react-router-dom';
import {useCart} from '../context/CartContext';
import {useWishlist} from '../context/WishlistContext';

const ProductCard = ({product}) => {
    const {addToCart} = useCart();
    const {toggleWishlist, isInWishlist} = useWishlist();

    function handleAddToCart(e){
        e.preventDefault();
        addToCart(product);
    }

   async function handleWishlistClick(e){
        e.preventDefault();
        try {
            await toggleWishlist(product);
        } catch(error){
            console.error('Errore nella Wishlist', error);
        }
    }

    return (
        <div className='product-card'>
            <Link to={`/products/${product._id}`} className='product-card-link'>

            <img src={product.imageUrl} alt={product.name} className='product-card-image' />
            
            {product.category && (
                <p className='product-card-category'>{product.category}</p>
            )}

            <h3 className='product-card-name'>{product.name}</h3>
            <p className='product-card-price'>{product.price?.toFixed(2) ?? '0.00'} €</p>
            </Link>
            <button onClick={handleAddToCart} className='product-card-addCart-btn'>Aggiungi al carrello</button>
            <button onClick={handleWishlistClick} className='product-card-addWishlist-btn'>
                {isInWishlist(product._id) ? '♥' : '♡'}
            </button>
        </div>
    );
}

export default ProductCard;