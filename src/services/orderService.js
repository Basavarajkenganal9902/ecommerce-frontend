const API_URL = `${import.meta.env.VITE_API_BASE_URL}/orders`;

export async function createOrder(orderData) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to place order"
        );
    }

    return data;
}