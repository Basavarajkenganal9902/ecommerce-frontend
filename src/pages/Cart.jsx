import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {

    const {
        cartItems,
        removeFromCart,
        cartTotal,
        clearCart
    } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="cart-page">
                <h1>Your Cart</h1>

                <p>Your cart is empty.</p>

                <Link to="/">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="cart-page">

            <h1>Your Cart</h1>

            {cartItems.map((item) => (
                <div className="cart-item" key={item.id}>

                    <img
                        src={item.imageUrl}
                        alt={item.name}
                    />

                    <div>
                        <h2>{item.name}</h2>

                        <p>
                            Price: ₹{item.price}
                        </p>

                        <p>
                            Quantity: {item.cartQuantity}
                        </p>

                        <p>
                            Subtotal: ₹
                            {item.price * item.cartQuantity}
                        </p>

                        <button
                            onClick={() =>
                                removeFromCart(item.id)
                            }
                        >
                            Remove
                        </button>
                    </div>

                </div>
            ))}

            <div className="cart-summary">

                <h2>
                    Total: ₹{cartTotal}
                </h2>

                <button onClick={clearCart}>
                    Clear Cart
                </button>

                <Link to="/checkout">
                    Checkout
                </Link>

                <Link to="/">
                    Continue Shopping
                </Link>

            </div>

        </div>
    );
}

export default Cart;