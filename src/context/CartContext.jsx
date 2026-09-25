import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

    const [cartItems, setCartItems] = useState([]);

    function addToCart(product) {

        setCartItems((currentItems) => {

            const existingItem = currentItems.find(
                (item) => item.id === product.id
            );

            if (existingItem) {

                return currentItems.map((item) =>
                    item.id === product.id
                        ? {
                            ...item,
                            cartQuantity: item.cartQuantity + 1
                        }
                        : item
                );
            }

            return [
                ...currentItems,
                {
                    ...product,
                    cartQuantity: 1
                }
            ];
        });
    }

    function removeFromCart(productId) {

        setCartItems((currentItems) =>
            currentItems.filter(
                (item) => item.id !== productId
            )
        );
    }

    function clearCart() {
        setCartItems([]);
    }

    const cartTotal = cartItems.reduce(
        (total, item) =>
            total + item.price * item.cartQuantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                clearCart,
                cartTotal
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}