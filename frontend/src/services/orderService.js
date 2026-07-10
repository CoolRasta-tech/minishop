import request from "./api";

export const orderService = {
    createOrder: async (cartItems) => {
        return request('/orders', {
            method: 'POST',
            body: JSON.stringify({
                items: cartItems
            })
        });
    },

    getUserOrders: async () => {
        return request('/orders');
    },

    getOrderById: async (id) => {
        return request(`/orders/${id}`);
    }
}