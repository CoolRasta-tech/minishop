import { useState, useEffect, useMemo } from 'react';
import { productService } from '../services/productService';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await productService.getProducts();
                // Gestisce sia array diretto sia { data: [...] } — verifica il tuo controller
                // e semplifica tenendo solo il ramo corretto
                setProducts(Array.isArray(data) ? data : data.data || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    const categories = useMemo(() => {
        const unique = new Set(products.map((p) => p.category).filter(Boolean));
        return ['all', ...unique];
    }, [products]);

    const filteredProducts = useMemo(() => {
        if (selectedCategory === 'all') return products;
        return products.filter((p) => p.category === selectedCategory);
    }, [products, selectedCategory]);

    if (loading) return <Spinner />;

    if (error) return <p className="error">{error}</p>;

    return (
        <div className="home-page">
            <h1>Catalogo</h1>

            {categories.length > 1 && (
                <div className="category-filter">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={selectedCategory === cat ? 'active' : ''} >
                            {cat === 'all' ? 'Tutte' : cat}
                        </button>
                    ))}
                </div>
            )}

            {filteredProducts.length === 0 ? (
                <p>Nessun prodotto disponibile.</p>
            ) : (
                <div className="product-grid">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}