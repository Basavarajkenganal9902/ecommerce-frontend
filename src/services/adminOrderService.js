const API_URL = `${import.meta.env.VITE_API_BASE_URL}/orders`;

function getAuthHeaders() {
    const token = localStorage.getItem("token");

    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    };
}

// Get all orders
export async function getAllOrders() {

    const response = await fetch(API_URL, {
        method: "GET",
        headers: getAuthHeaders()
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch orders");
    }

    return data;
}

// Update order status
export async function updateOrderStatus(orderId, status) {

    const response = await fetch(
        `${API_URL}/${orderId}/status`,
        {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify({
                status: status
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to update order status");
    }

    return data;
}