const API_URL = `${import.meta.env.VITE_API_BASE_URL}/products`;

function getAuthHeaders() {

    const token = localStorage.getItem("token");

    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
}

export async function addProduct(product) {

    const response = await fetch(API_URL, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(product)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to add product"
        );
    }

    return data;
}

export async function updateProduct(id, product) {

    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(product)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to update product"
        );
    }

    return data;
}

export async function deleteProduct(id) {

    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders()
    });

    if (!response.ok) {

        let message = "Failed to delete product";

        try {
            const data = await response.json();
            message = data.message || message;
        } catch {
            // No JSON response
        }

        throw new Error(message);
    }

    return true;
}