import React, { useEffect, useState } from 'react'
import { useCart } from '../../context/cartContext';
import CartProduct from '../../components/ProductCard/CartProduct';
import './Cart.css'
import { Link } from 'react-router-dom';
import EMPTY_CART from '../../assets/images/empty_cart.svg'

const Cart = () => {
    const { state: { cart } } = useCart();
    const [total, setTotal] = useState(0);

    useEffect(() => {
        setTotal(cart.reduce((acc, product) => acc + Number(product.prize), 0))
    }, [cart])

    return (
        <div className="cart">
            {cart.length === 0
                ? (
                    <div className="cart-empty">
                        <img src={EMPTY_CART} alt="empty cart" />
                        <h3>Your cart is empty</h3>
                        <p>
                            You can add products to your cart by clicking on the "Add to Cart" button on the
                            {" "}<Link to={"/"}>Product Page</Link>
                        </p>
                    </div>
                )
                : (
                    <>
                        <div className="cart-info">
                            <h3>Cart Items {cart.length}</h3>
                            <h4>SubTotal Rs. {total}</h4>
                        </div>
                        {cart.map((product, i) => {
                            return (<div key={product.key + i}>
                                <CartProduct product={product} />
                            </div>)
                        })
                        }
                    </>
                )
            }
        </div>
    )
}

export default Cart