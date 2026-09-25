import { Link, useLocation } from "react-router-dom";

function OrderSuccess() {

    const location = useLocation();

    const order = location.state?.order;

    return (
        <div className="success-page">

            <h1>✅ Order Placed Successfully!</h1>

            {order && (
                <>
                    <p>Order ID: #{order.id}</p>

                    <p>
                        Payment Method: {order.paymentMethod}
                    </p>

                    <p>
                        Status: {order.status}
                    </p>

                    <p>
                        Total: ₹{order.totalAmount}
                    </p>
                </>
            )}

            <Link to="/">
                Continue Shopping
            </Link>

        </div>
    );
}

export default OrderSuccess;