import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import {
    addProduct,
    updateProduct,
    deleteProduct
} from "../services/adminProductService";

import { getProducts } from "../services/productService";

function AdminDashboard() {

    const navigate = useNavigate();

    const [products, setProducts] = useState([]);

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        quantity: "",
        imageUrl: ""
    });

    useEffect(() => {

        const token = localStorage.getItem("token");
        const role = localStorage.getItem("adminRole");

        if (!token || role !== "ROLE_ADMIN") {
            navigate("/admin-login");
            return;
        }

        loadProducts();

    }, [navigate]);

    async function loadProducts() {

        try {

            const data = await getProducts();

            setProducts(data);

        } catch (err) {

            setError(err.message);
        }
    }

    function handleChange(event) {

        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    function openAddForm() {

        setEditingId(null);

        setFormData({
            name: "",
            description: "",
            price: "",
            quantity: "",
            imageUrl: ""
        });

        setError("");
        setSuccess("");

        setShowForm(true);
    }

    function openEditForm(product) {

        setEditingId(product.id);

        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            quantity: product.quantity,
            imageUrl: product.imageUrl
        });

        setError("");
        setSuccess("");

        setShowForm(true);
    }

    function closeForm() {

        setShowForm(false);
        setEditingId(null);
    }

    async function handleSubmit(event) {

        event.preventDefault();

        setError("");
        setSuccess("");

        try {

            const productData = {
                name: formData.name,
                description: formData.description,
                price: Number(formData.price),
                quantity: Number(formData.quantity),
                imageUrl: formData.imageUrl
            };

            if (editingId) {

                await updateProduct(
                    editingId,
                    productData
                );

                setSuccess("Product updated successfully.");

            } else {

                await addProduct(productData);

                setSuccess("Product added successfully.");
            }

            closeForm();

            await loadProducts();

        } catch (err) {

            setError(err.message);
        }
    }

    async function handleDelete(id) {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this product?"
            );

        if (!confirmed) {
            return;
        }

        setError("");
        setSuccess("");

        try {

            await deleteProduct(id);

            setSuccess("Product deleted successfully.");

            await loadProducts();

        } catch (err) {

            setError(err.message);
        }
    }

    function handleLogout() {

        localStorage.removeItem("token");
        localStorage.removeItem("adminEmail");
        localStorage.removeItem("adminRole");

        navigate("/admin-login");
    }

    return (
        <div className="admin-dashboard">

            <header className="admin-header">

                <div>
                    <h1>Admin Dashboard</h1>
                    <Link to="/admin/orders">
                        <button>Manage Orders</button>
                    </Link>

                    <p>Manage your products</p>
                </div>

                <button onClick={handleLogout}>
                    Logout
                </button>

            </header>

            {error && (
                <p className="admin-error">
                    {error}
                </p>
            )}

            {success && (
                <p className="admin-success">
                    {success}
                </p>
            )}

            <div className="admin-actions">

                <h2>Products</h2>

                <button onClick={openAddForm}>
                    + Add Product
                </button>

            </div>

            {showForm && (

                <form
                    className="product-form"
                    onSubmit={handleSubmit}
                >

                    <h2>
                        {editingId
                            ? "Edit Product"
                            : "Add Product"}
                    </h2>

                    <input
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        required
                    />

                    <input
                        type="number"
                        name="quantity"
                        placeholder="Quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        min="0"
                        required
                    />

                    <input
                        type="text"
                        name="imageUrl"
                        placeholder="Image URL"
                        value={formData.imageUrl}
                        onChange={handleChange}
                    />

                    <div className="form-buttons">

                        <button type="submit">
                            {editingId
                                ? "Update Product"
                                : "Add Product"}
                        </button>

                        <button
                            type="button"
                            onClick={closeForm}
                        >
                            Cancel
                        </button>

                    </div>

                </form>
            )}

            <div className="admin-products">

                {products.map((product) => (

                    <div
                        className="admin-product-card"
                        key={product.id}
                    >

                        <img
                            src={product.imageUrl}
                            alt={product.name}
                        />

                        <div className="admin-product-info">

                            <h3>{product.name}</h3>

                            <p>
                                {product.description}
                            </p>

                            <p>
                                Price: ₹{product.price}
                            </p>

                            <p>
                                Stock: {product.quantity}
                            </p>

                            <div className="product-actions">

                                <button
                                    onClick={() =>
                                        openEditForm(product)
                                    }
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        handleDelete(product.id)
                                    }
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
}

export default AdminDashboard;