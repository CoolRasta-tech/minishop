import { createContext, useContext, useState, useEffect } from "react";
import {authService} from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('minishop_token');
        const storedUser = localStorage.getItem('minishop_user');

        if (storedToken && storedUser) {
            try {
                setUser(JSON.parse(storedUser));
                setToken(storedToken);
            } catch {
                localStorage.removeItem('minishop_token');
                localStorage.removeItem('minishop_user');
            }
        }

        setLoading(false);
    }, []);

    async function login(email, password) {
        const data = await authService.login(email, password);

        localStorage.setItem('minishop_token', data.token);
        localStorage.setItem('minishop_user', JSON.stringify(data.user));
        setUser(data.user);
        setToken(data.token);
    }

    async function register(username, email, password) {
        await authService.register(username, email, password);
        await login(email, password);
    }

    function logout() {
        localStorage.removeItem('minishop_token');
        localStorage.removeItem('minishop_user');
        setUser(null);
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error('useAuth deve essere usato dentro un AuthProvider');
    }
    return ctx;
}