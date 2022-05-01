import classes from "./HeaderCartButton.module.css";
import CartIcon from "../cart/CartIcon";
import {useContext, useEffect, useState} from "react";
import CartContext from "../../store/cartContext";

const HeaderCartButton = (props) => {
    const [addAnimation, setAddAnimation] = useState(false);
    const {items} = useContext(CartContext);

    const totalItems = items.reduce((currentValue, item) => currentValue + item.amount, 0)
    const badgeClasses = `${classes.badge} ${addAnimation ? classes.bump : ""}`;

    useEffect(() => {
        if(items.length === 0) {
            return ;
        }
        setAddAnimation(true);

        const timer = setTimeout(() => setAddAnimation(false), 300);
        return () => clearTimeout(timer);
    }, [items])

    return (
        <button className={classes.button} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>Your Cart</span>
            <span className={badgeClasses}>{totalItems}</span>
        </button>
    );
};

export default HeaderCartButton;