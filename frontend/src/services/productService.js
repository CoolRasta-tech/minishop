import request from './api';

export const productService = {
    getProducts: (filters = {}) => {
        const params = new URLSearchParams();

        if(filters.category) params.set('category', filters.category);
        if(filters.search) params.set('search', filters.search);
        if(filters.sort) params.set('sort', filters.sort);
        if(filters.genre) params.set('genre', filters.genre);
        const query = params.toString() ? `?${params}` : "";

        return request(`/products${query}`);
    },

    getProductById: (id) => {
        return request(`/products/${id}`);
    },

    createProduct: (data) => {
        return request(`/products/`, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },

    updateProduct: (id, data) => {
        return request(`/products/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    },

    deleteProduct: (id) => {
        return request(`/products/${id}`, {
            method: 'DELETE'
        });
    }
}