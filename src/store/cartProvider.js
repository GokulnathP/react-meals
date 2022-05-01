import CartContext from "./cartContext";
import {useReducer} from "react";

const defaultState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if (action.type === "ADD") {
        const updateTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        const existingItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingItem = state.items[existingItemIndex];
        let updatedItems;

        if(existingItem) {
            const updatedItem = { ...existingItem, amount: existingItem.amount + action.item.amount };
            updatedItems = [ ...state.items ];
            updatedItems[existingItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }

        return {items: updatedItems, totalAmount: updateTotalAmount};
    }

    if (action.type === "REMOVE") {
        const existingItemIndex = state.items.findIndex(item => item.id === action.id);
        const existingItem = state.items[existingItemIndex];

        const updateTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;

        if(existingItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id);
        } else {
            const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
            updatedItems = [ ...state.items ];
            updatedItems[existingItemIndex] = updatedItem;
        }

        return {items: updatedItems, totalAmount: updateTotalAmount};
    }

    if(action.type === "CLEAR") {
        return defaultState;
    }

    return defaultState;
}

const CartProvider = (props) => {
    const [state, dispatch] = useReducer(cartReducer, defaultState);

    const addItem = (item) => {
        dispatch({type: "ADD", item})
    }

    const removeItem = (id) => {
        dispatch({type: "REMOVE", id})
    }

    const clearCart = () => {
        dispatch({type: "CLEAR"});
    }

    const cartContext = {
        ...state,
        addItem,
        removeItem,
        clearCart
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartProvider;