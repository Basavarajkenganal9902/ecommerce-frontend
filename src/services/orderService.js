const API_URL = "http://localhost:8080/api/orders";

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