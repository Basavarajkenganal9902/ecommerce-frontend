import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginAdmin } from "../services/authService";

function AdminLogin() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {

        event.preventDefault();

        setError("");
        setLoading(true);

        try {

            const data = await loginAdmin(
                email,
                password
            );

            if (data.role === "ROLE_ADMIN") {
                navigate("/admin");
            } else {
                setError("You are not authorized as admin.");
            }

        } catch (err) {

            setError(err.message);

        } finally {

            setLoading(false);
        }
    }

    return (
        <div className="admin-login-page">

            <div className="admin-login-card">

                <h1>Admin Login</h1>

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        placeholder="Admin Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />

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
                            ? "Logging in..."
                            : "Login"}
                    </button>

                </form>

                <Link
                    to="/"
                    className="home-link"
                >
                    ← Back to Home
                </Link>

            </div>

        </div>
    );
}

export default AdminLogin;