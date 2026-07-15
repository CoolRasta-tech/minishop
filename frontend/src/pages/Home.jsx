import { useState, useEffect, useMemo } from 'react';
import { productService } from '../services/productService';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedGenre, setSelectedGenre] = useState('all');
    const [search, setSearch] = useState(''); // ← nuovo stato

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await productService.getProducts();
                setProducts(data);
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

    const genres = useMemo(() => {
        const source = selectedCategory === 'all'
            ? []
            : products.filter((p) => p.category === selectedCategory);
        const unique = new Set(source.map((p) => p.genre).filter(Boolean));
        return ['all', ...unique];
    }, [products, selectedCategory]);

    const filteredProducts = useMemo(() => {
        return products.filter((p) => {
            const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
            const matchGenre = selectedGenre === 'all' || p.genre === selectedGenre;
            const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()); // ← nuovo filtro
            return matchCategory && matchGenre && matchSearch;
        });
    }, [products, selectedCategory, selectedGenre, search]);

    function handleCategoryClick(cat) {
        setSelectedCategory(cat);
        setSelectedGenre('all');
    }

    if (loading) return <Spinner />;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="home-page">
            <h1>Catalogo</h1>
            
            <input
                type="text"
                placeholder="Cerca un videogioco..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-bar"/>

            {categories.length > 1 && (
                <div className="category-filter">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryClick(cat)}
                            className={selectedCategory === cat ? 'active' : ''}>
                            {cat === 'all' ? 'Tutte le piattaforme' : cat}
                        </button>
                    ))}
                </div>
            )}

            {selectedCategory !== 'all' && genres.length > 1 && (
                <div className="genre-filter">
                    {genres.map((genre) => (
                        <button
                            key={genre}
                            onClick={() => setSelectedGenre(genre)}
                            className={selectedGenre === genre ? 'active' : ''}>
                            {genre === 'all' ? 'Tutti i generi' : genre}
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