import request from "./api";

export const authService = {
    login: (email, password) => {
        return request("/auth/login", {
            method: "POST",
            body: JSON.stringify({
                email,
                password
            })
        });
    },

    register: (username, email, password) => {
        return request("/auth/register", {
            method: "POST",
            body: JSON.stringify({
                email,
                username,
                password
            })
        });
    }
}