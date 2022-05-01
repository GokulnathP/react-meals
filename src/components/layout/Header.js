import mealsImg from '../../assets/meals.jpeg';
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
    return (
        <>
            <header className={classes.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton onClick={props.onCartClick}/>
            </header>
            <div className={classes.mainImage}>
                <img src={mealsImg} alt="A table of meals"/>
            </div>
        </>
    );
};

export default Header;