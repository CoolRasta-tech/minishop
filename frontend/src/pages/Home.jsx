import {useState, useEffect} from 'react';
import { productService } from '../services/productService';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';

export default function Home(){
    const[products,setProducts] = useState([]);
    const[loading,setLoading] = useState(true);
    const[error,setError] = useState('');

    useEffect(()=>{
        async function fetchProducts(){
            try{
                const data = await productService.getProducts();
                setProducts(data);
            }catch(err){
                setError(err.message);
            }finally{
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    if(loading) return <Spinner/>;

    if(error) return <p className="error">{error}</p>;

    return(
        <div className="home-page">
            <h1>Catalogo</h1>
            
            {products.length === 0 ? (
                <p>Nessun prodotto disponibile.</p>
            ): (
                <div className = "product-grid">
                    {products.map((product) =>(
                        <ProductCard key={product._id} product = {product} />
                    ))}
                    </div>
            )}
        </div>
    );
}