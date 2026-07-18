import request from "./api";

export const orderService = {
    createOrder: (cartItems) => {
        return request('/orders', {
            method: 'POST',
            body: JSON.stringify({
                items: cartItems
            })
        });
    },

    getUserOrders: () => {
        return request('/orders');
    },

    getOrderById: (id) => {
        return request(`/orders/${id}`);
    }
}