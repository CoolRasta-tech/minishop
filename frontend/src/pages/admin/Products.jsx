import { useState, useEffect } from 'react';
import { productService } from '../../services/productService';
import Spinner from '../../components/Spinner';

const EMPTY_FORM = {
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: '',
    stock: '',
};

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState('');

    async function fetchProducts() {
            setLoading(true);
            try {
                const data = await productService.getProducts();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

    useEffect(() => {
        fetchProducts();
    }, []);

    function openCreateModal() {
        setEditingProduct(null);
        setFormData(EMPTY_FORM);
        setFormError('');
        setIsModalOpen(true);
    }

    function openEditModal(product) {
        setEditingProduct(product);
        setFormData({
            name: product.name || '',
            description: product.description || '',
            price: product.price ?? '',
            imageUrl: product.imageUrl || '',
            category: product.category || '',
            stock: product.stock ?? '',
        });
        setFormError('');
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
        setEditingProduct(null);
        setFormData(EMPTY_FORM);
        setFormError('');
    }

    function handleFormChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        setSubmitting(true);
        setFormError('');

        const payload = {
            ...formData,
            price: Number(formData.price),
            stock: Number(formData.stock),
        };

        try {
            if (editingProduct) {
                await productService.updateProduct(editingProduct._id, {
                    price: payload.price,
                    stock: payload.stock,
                });
            } else {
                await productService.createProduct(payload);
            }
            await fetchProducts();
            closeModal();
        } catch (err) {
            setFormError(err.message);
        } finally {
            setSubmitting(false);
        }
    }

    async function handleDelete(product) {
        const confirmed = window.confirm(
            `Eliminare "${product.name}"? L'operazione non è reversibile.`
        );
        if (!confirmed) return;

        try {
            await productService.deleteProduct(product._id);
            setProducts((prev) => prev.filter((p) => p._id !== product._id));
        } catch (err) {
            setError(err.message);
        }
    }

    if (loading) return <Spinner />;

    if (error) return <p className="error">{error}</p>;

    return (
        <div className="admin-products-page">
            <div className="admin-products-header">
                <h1>Gestione prodotti</h1>
                <button onClick={openCreateModal} className="create-product-btn">
                    + Nuovo prodotto
                </button>
            </div>

            {products.length === 0 ? (
                <p>Nessun prodotto presente.</p>
            ) : (
                <table className="admin-products-table">
                    <thead>
                        <tr>
                            <th>Immagine</th>
                            <th>Nome</th>
                            <th>Categoria</th>
                            <th>Genere</th>
                            <th>Prezzo</th>
                            <th>Stock</th>
                            <th>Azioni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="admin-product-thumb"
                                    />
                                </td>
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td>{product.genre}</td>
                                <td>{product.price.toFixed(2)} €</td>
                                <td>{product.stock}</td>
                                <td>
                                    <div className="admin-product-actions">
                                        <button 
                                            onClick={() => openEditModal(product)}>
                                            Modifica</button>
                                        <button 
                                            onClick={() => handleDelete(product)} 
                                            className="delete-btn">
                                            Elimina</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>{editingProduct ? 'Modifica prodotto' : 'Nuovo prodotto'}</h2>

                        <form onSubmit={handleFormSubmit} className="product-form">
                            <label>
                                Nome
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleFormChange}
                                    required />
                            </label>

                            <label>
                                Descrizione
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleFormChange}
                                    rows={3} />
                            </label>

                            <label>
                                Prezzo (€)
                                <input
                                    type="number"
                                    name="price"
                                    min="0"
                                    step="0.01"
                                    value={formData.price}
                                    onChange={handleFormChange}
                                    required />
                            </label>

                            <label>
                                URL immagine
                                <input
                                    type="text"
                                    name="imageUrl"
                                    value={formData.imageUrl}
                                    onChange={handleFormChange} />
                            </label>

                            <label>
                                Categoria
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleFormChange}
                                    required />
                            </label>

                            <label>
                                Genere
                                <input 
                                    type='text'
                                    name='genre'
                                    value={formData.genre}
                                    onChange={handleFormChange}
                                    required />
                            </label>

                            <label>
                                Stock
                                <input
                                    type="number"
                                    name="stock"
                                    min="0"
                                    value={formData.stock}
                                    onChange={handleFormChange}
                                    required />
                            </label>

                            {formError && <p className="error">{formError}</p>}

                            <div className="modal-actions">
                                <button type="button" onClick={closeModal} disabled={submitting}>
                                    Annulla
                                </button>
                                <button type="submit" disabled={submitting}>
                                    {submitting ? 'Salvataggio...' : 'Salva'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}