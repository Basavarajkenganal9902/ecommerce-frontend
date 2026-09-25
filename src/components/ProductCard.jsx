function ProductCard({ product, onAddToCart }) {

    return (
        <div className="product-card">

            <img
                src={product.imageUrl}
                alt={product.name}
            />

            <h2>{product.name}</h2>

            <p>{product.description}</p>

            <h3>₹{product.price}</h3>

            <p>Available: {product.quantity}</p>

            <button
                onClick={() => onAddToCart(product)}
                disabled={product.quantity === 0}
            >
                {product.quantity === 0
                    ? "Out of Stock"
                    : "Add to Cart"}
            </button>

        </div>
    );
}

export default ProductCard;