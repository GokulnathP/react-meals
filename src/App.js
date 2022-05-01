import Header from "./components/layout/Header";
import Meals from "./components/meals/Meals";
import Cart from "./components/cart/Cart";
import {useState} from "react";
import CartProvider from "./store/cartProvider";

const App = () => {
    const [cartVisible, setCartVisible] = useState(false);

    const showCart = () => setCartVisible(true);

    const hideCart = () => setCartVisible(false);

    return (
        <CartProvider>
            {cartVisible && <Cart onClose={hideCart}/>}
            <Header onCartClick={showCart}/>
            <main>
                <Meals/>
            </main>
        </CartProvider>
    );
}

export default App;
