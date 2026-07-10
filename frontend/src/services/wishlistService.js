import request from "./api";

export const wishlistService = {
    getWishlist: () => {
        return request('/wishlist');
    },

    addToWishlist: (id) => {
        return request(`/wishlist/${id}`, {
            method: 'POST'
        })
    },

    removeFromWishlist: (id) => {
        return request(`/wishlist/${id}`,{
            method: 'DELETE'
        })
    }
}