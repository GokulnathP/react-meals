import classes from "./MealsItemForm.module.css";
import Input from "../../ui/Input";
import {useRef, useState} from "react";

const MealsItemForm = (props) => {
    const [isValid, setIsValid] = useState(true);
    const amountRef = useRef();

    const addMealToCart = (event) => {
        event.preventDefault();

        const amount = amountRef.current.value;

        if(amount.trim().length === 0 || +amount < 1 || +amount > 5) {
            setIsValid(false);
             return;
        }

        setIsValid(true);
        props.onAddToCart(+amount);
    }

    return (
        <form className={classes.form} onSubmit={addMealToCart}>
            <Input
                ref={amountRef}
                label="Amount"
                input={{
                    id: props.id,
                    type: "number",
                    min: "1",
                    max: "5",
                    step: "1",
                    defaultValue: "1"
                }}
            />
            <button>+ Add</button>
            {!isValid && <p>Please enter a valid amount (1-5).</p>}
        </form>
    );
};

export default MealsItemForm;