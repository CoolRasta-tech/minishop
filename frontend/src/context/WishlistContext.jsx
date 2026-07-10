import {createContext, useContext, useState, useEffect, useMemo} from "react";
import {useAuth} from './AuthContext';
import {wishlistService} from '../services/wishlistService';

const WishlistContext = createContext(null);

export function WishlistProvider({children}){
    const {user, token} = useAuth();
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(!user || !token){
            setWishlist([]);
            setLoading(false);
            return;
        }

        async function fetchWishlist(){
            try {
                const data = await wishlistService.getWishlist();
                setWishlist(data)
            } catch(error){
                console.error('Errore nel caricamento della Wishlist', error);
            } finally {
                setLoading(false);
            }
        }

        fetchWishlist();
    }, [user, token]);

    function isInWishlist(productId){
        return wishlist.some(item => item._id === productId);
    }

    async function addToWishlist(product){
        await wishlistService.addToWishlist(product._id);
        setWishlist(prev => [...prev, product]);
    }

    async function removeFromWishlist(productId){
        await wishlistService.removeFromWishlist(productId);
        setWishlist(prev => prev.filter(item => item._id !== productId));
    }

    async function toggleWishlist(product){
        if(isInWishlist(product._id)){
            await removeFromWishlist(product._id)
        } else {
            await addToWishlist(product);
        }
    }
    
    const wishlistCount = wishlist.length;

    return (
        <WishlistContext.Provider 
            value={{
                wishlist, 
                loading, 
                isInWishlist,
                addToWishlist,
                removeFromWishlist,
                toggleWishlist,
                wishlistCount
            }} >

            {children}
        </WishlistContext.Provider>
    )
};

export function useWishlist(){
    const ctx = useContext(WishlistContext);
    if(!ctx){
        throw new Error('useWishlist deve essere usato dentro un WishlistProvider')
    }
    return ctx;
}
