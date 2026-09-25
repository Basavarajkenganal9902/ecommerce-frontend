import { useEffect, useState } from "react";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOrders from "./components/AdminOrders";
import {
  BrowserRouter,
  Link,
  Route,
  Routes
} from "react-router-dom";

import { getProducts } from "./services/productService";
import ProductCard from "./components/ProductCard";
import Cart from "./pages/Cart";

import { useCart } from "./context/CartContext";

import "./App.css";

function Home() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const {
    addToCart,
    cartItems,
    cartTotal
  } = useCart();

  useEffect(() => {

    getProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });

  }, []);

  if (loading) {
    return <h2>Loading products...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>

      <nav className="navbar">

        <Link to="/" className="logo">
          My E-Commerce Store
        </Link>

        <Link to="/admin-login">
          Admin Login
        </Link>

        <Link to="/cart">
          🛒 Cart ({cartItems.length}) |
          ₹{cartTotal}
        </Link>

      </nav>

      <main>

        <h1>Our Products</h1>

        <div className="products">

          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}

        </div>

      </main>

    </div>
  );
}

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route
          path="/order-success"
          element={<OrderSuccess />}
        />

        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route path="/admin/orders" element={<AdminOrders />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;