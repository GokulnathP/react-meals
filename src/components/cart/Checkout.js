import classes from './Checkout.module.css';
import {useRef, useState} from "react";

const isEmpty = (value) => value.trim().length === 0;
const isValidpostalCode = (value) => value.trim().length >= 5;

const Checkout = (props) => {
    const [isFormValid, setIsFormValid] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true
    });
    const nameRef = useRef();
    const streetRef = useRef();
    const cityRef = useRef();
    const postalCodeRef = useRef();

    const onCheckout = (event) => {
        event.preventDefault();
        const formData = {
            name: nameRef.current.value,
            street: streetRef.current.value,
            city: cityRef.current.value,
            postalCode: postalCodeRef.current.value,
        }

        const isFormDataValid = {
            name: !isEmpty(formData.name),
            street: !isEmpty(formData.street),
            city: !isEmpty(formData.city),
            postalCode: isValidpostalCode(formData.postalCode)
        }

        setIsFormValid(isFormDataValid);

        if (!(isFormDataValid.name && isFormDataValid.street && isFormDataValid.city && isFormDataValid.postalCode)) {
            return;
        }

        props.onSubmit(formData);
    };

    const getFormControlClasses = (isValid) => `${classes.control} ${isValid ? "" : classes.invalid}`;

    return (
        <form className={classes.form} onSubmit={onCheckout}>
            <div className={getFormControlClasses(isFormValid.name)}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameRef}/>
                {!isFormValid.name && <p>Please enter valid name!</p>}
            </div>
            <div className={getFormControlClasses(isFormValid.street)}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetRef}/>
                {!isFormValid.street && <p>Please enter valid street!</p>}
            </div>
            <div className={getFormControlClasses(isFormValid.postalCode)}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postalCodeRef}/>
                {!isFormValid.postalCode && <p>Please enter valid postal code!</p>}
            </div>
            <div className={getFormControlClasses(isFormValid.city)}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityRef}/>
                {!isFormValid.city && <p>Please enter valid city!</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;