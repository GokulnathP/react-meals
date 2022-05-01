import classes from "./MealsItem.module.css";
import MealsItemForm from "./MealsItemForm";
import {useContext} from "react";
import CartContext from "../../../store/cartContext";

const MealsItem = (props) => {
    const cartContext = useContext(CartContext);
    const price = `${props.price.toFixed(2)}`;

    const addToCart = (amount) => {
        cartContext.addItem({
            id: props.id,
            name: props.name,
            price: props.price,
            amount: amount
        })
    };

    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealsItemForm id={props.id} onAddToCart={addToCart}/>
            </div>
        </li>
    );
};

export default MealsItem;