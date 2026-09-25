const API_URL = "http://localhost:8080/api/auth";

export async function loginAdmin(email, password) {

    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Invalid email or password"
        );
    }

    // Save JWT
    localStorage.setItem("token", data.token);

    // Save email
    localStorage.setItem("adminEmail", data.email);

    // Save role
    localStorage.setItem("adminRole", data.role);

    return data;
}

export function getToken() {
    return localStorage.getItem("token");
}

export function logoutAdmin() {
    localStorage.removeItem("token");
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("adminRole");
}