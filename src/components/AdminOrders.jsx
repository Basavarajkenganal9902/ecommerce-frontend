import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    getAllOrders,
    updateOrderStatus
} from "../services/adminOrderService";

function AdminOrders() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        async function loadOrders() {

            try {
                setLoading(true);
                setError("");

                const data = await getAllOrders();
                setOrders(data);

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        loadOrders();

    }, []);

    async function handleStatusChange(orderId, newStatus) {

        try {

            const updatedOrder =
                await updateOrderStatus(orderId, newStatus);

            setOrders((previousOrders) =>
                previousOrders.map((order) =>
                    order.id === updatedOrder.id
                        ? updatedOrder
                        : order
                )
            );

        } catch (error) {
            setError(error.message);
        }
    }

    if (loading) {
        return (
            <p className="loading">
                Loading orders...
            </p>
        );
    }

    return (
        <div className="admin-orders">

            <div className="orders-header">

                <Link
                    to="/admin"
                    className="back-button"
                >
                    ← Back to Dashboard
                </Link>

                <h2>Manage Orders</h2>

            </div>

            {error && (
                <p className="error-message">
                    {error}
                </p>
            )}

            {orders.length === 0 ? (

                <p className="no-orders">
                    No orders found.
                </p>

            ) : (

                <div className="orders-table-container">

                    <table className="orders-table">

                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Total</th>
                                <th>Payment</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>

                            {orders.map((order) => (

                                <tr key={order.id}>

                                    <td className="order-id">
                                        #{order.id}
                                    </td>

                                    <td>
                                        {order.customerName}
                                    </td>

                                    <td>
                                        {order.email}
                                    </td>

                                    <td>
                                        {order.phone}
                                    </td>

                                    <td>
                                        {order.address}
                                    </td>

                                    <td className="order-total">
                                        ₹{order.totalAmount}
                                    </td>

                                    <td>
                                        {order.paymentMethod}
                                    </td>

                                    <td>

                                        <select
                                            className="status-select"
                                            value={order.status}
                                            onChange={(e) =>
                                                handleStatusChange(
                                                    order.id,
                                                    e.target.value
                                                )
                                            }
                                        >

                                            <option value="PENDING">
                                                PENDING
                                            </option>

                                            <option value="CONFIRMED">
                                                CONFIRMED
                                            </option>

                                            <option value="SHIPPED">
                                                SHIPPED
                                            </option>

                                            <option value="DELIVERED">
                                                DELIVERED
                                            </option>

                                        </select>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            )}

        </div>
    );
}

export default AdminOrders;