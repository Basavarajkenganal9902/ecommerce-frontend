import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { createOrder } from "../services/orderService";


function Checkout() {

    const {
        cartItems,
        cartTotal,
        clearCart
    } = useCart();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        customerName: "",
        email: "",
        phone: "",
        address: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function handleChange(event) {

        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    async function handleSubmit(event) {

        event.preventDefault();

        if (cartItems.length === 0) {
            setError("Your cart is empty.");
            return;
        }

        setLoading(true);
        setError("");

        const orderData = {
            customerName: formData.customerName,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,

            items: cartItems.map((item) => ({
                productId: item.id,
                quantity: item.cartQuantity
            }))
        };

        try {

            const order = await createOrder(orderData);

            clearCart();

            navigate("/order-success", {
                state: {
                    order
                }
            });

        } catch (err) {

            setError(err.message);

        } finally {

            setLoading(false);
        }
    }

    if (cartItems.length === 0) {

        return (
            <div className="checkout-page">

                <h1>Your Cart is Empty</h1>

                <Link to="/">
                    Continue Shopping
                </Link>

            </div>
        );
    }

    return (
        <div className="checkout-page">

            <Link to="/cart" className="back-button">
                ← Back to Cart
            </Link>

            <h1>Checkout</h1>

            <div className="checkout-container">

                <form
                    className="checkout-form"
                    onSubmit={handleSubmit}
                >

                    <h2>Customer Details</h2>

                    <input
                        type="text"
                        name="customerName"
                        placeholder="Full Name"
                        value={formData.customerName}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="address"
                        placeholder="Delivery Address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />

                    <h2>Payment Method</h2>

                    <div className="payment-method">
                        <label>
                            <input
                                type="radio"
                                checked
                                readOnly
                            />

                            Cash on Delivery
                        </label>
                    </div>

                    {error && (
                        <p className="error-message">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Placing Order..."
                            : "Place Order"}
                    </button>

                </form>

                <div className="checkout-summary">

                    <h2>Order Summary</h2>

                    {cartItems.map((item) => (

                        <div
                            className="summary-item"
                            key={item.id}
                        >

                            <span>
                                {item.name} × {item.cartQuantity}
                            </span>

                            <span>
                                ₹{item.price * item.cartQuantity}
                            </span>

                        </div>

                    ))}

                    <hr />

                    <h2>
                        Total: ₹{cartTotal}
                    </h2>

                </div>

            </div>

        </div>
    );
}

export default Checkout;