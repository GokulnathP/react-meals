import classes from "./Cart.module.css";
import Modal from "../ui/Modal";
import {useContext, useState} from "react";
import CartContext from "../../store/cartContext";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartContext = useContext(CartContext);

    const totalAmount = `${cartContext.totalAmount.toFixed(2)}`
    const hasItems = cartContext.items.length > 0;

    const onAddItem = (item) => {
        cartContext.addItem({...item, amount: 1})
    };
    const onRemoveItem = (id) => {
        cartContext.removeItem(id);
    }

    const onOrder = () => {
        setIsCheckout(true);
    }

    const onSubmit = async (userData) => {
        setIsSubmitting(true);

        await fetch("https://react-meals-app-c033a-default-rtdb.firebaseio.com/orders.json", {
            method: "POST",
            body: JSON.stringify({
                user: userData,
                orderedItems: cartContext.items
            })
        });

        setIsSubmitting(false);
        setDidSubmit(true);

        cartContext.clearCart();
    }

    const cartItems = cartContext.items.map(item => (
        <CartItem
            key={item.id}
            {...item}
            onAdd={onAddItem.bind(null, item)}
            onRemove={onRemoveItem.bind(null, item.id)}
        />
    ))

    const modalActions = (
        <div className={classes.actions}>
            <button className={classes["button--alt"]} onClick={props.onClose}>Close</button>
            {hasItems && <button className={classes.button} onClick={onOrder}>Order</button>}
        </div>
    );

    if (isSubmitting) {
        return (
            <Modal onClose={props.onClose}>
                <p>Sending order data...</p>
            </Modal>
        );
    }

    if (didSubmit) {
        return (
            <Modal onClose={props.onClose}>
                <p>Successfully sent the order!!</p>
                <div className={classes.actions}>
                    <button className={classes["button--alt"]} onClick={props.onClose}>Close</button>
                </div>
            </Modal>
        );
    }

    return (
        <Modal onClose={props.onClose}>
            <ul className={classes["cart-items"]}>{cartItems}</ul>
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout ? <Checkout onSubmit={onSubmit} onCancel={props.onClose}/> : modalActions}
        </Modal>
    );
};

export default Cart;