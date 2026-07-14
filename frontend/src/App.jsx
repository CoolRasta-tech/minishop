import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetail from './pages/ProductDetail';
import OrderDetail from './pages/OrderDetail';
import Orders from './pages/Orders';
import Wishlist from './pages/Wishlist';

import Products from './pages/admin/Products';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <Navbar />

            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/products/:id' element={<ProductDetail />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />

              <Route element={<ProtectedRoute />}>
                <Route path='/cart' element={<Cart />} />
                <Route path='/checkout' element={<Checkout />} />
                <Route path='/orders' element={<Orders />} />
                <Route path='/wishlist' element={<Wishlist />} />
                <Route path='/orders/:id' element={<OrderDetail />} />
              </Route>

              <Route element={<ProtectedRoute adminOnly />}>
                <Route path='/admin/products' element={<Products />} />
              </Route>
            </Routes>
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
