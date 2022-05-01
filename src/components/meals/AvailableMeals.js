import classes from "./AvailableMeals.module.css";
import Card from "../ui/Card";
import MealsItem from "./mealsItem/MealsItem";
import {useEffect, useState} from "react";

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    const mealsList = meals.map(meal => <MealsItem key={meal.id} {...meal}/>);

    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch("https://react-meals-app-c033a-default-rtdb.firebaseio.com/meals.json");

            if (!response.ok) {
                throw new Error("Something went wrong");
            }
            const data = await response.json();

            const loadedMeals = [];

            for (const key in data) {
                loadedMeals.push({
                    id: key,
                    ...data[key]
                })
            }

            setMeals(loadedMeals);
            setIsLoading(false);
        }

        fetchMeals().catch(error => {
            setIsLoading(false);
            setError(error.message);
        });
    }, []);


    if (isLoading) {
        return (
            <section className={classes.mealsLoading}>
                <p>Loading...</p>
            </section>
        );
    }

    if(error) {
        return (
            <section className={classes.mealsError}>
                <p>{error}</p>
            </section>
        );
    }

    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    );
}

export default AvailableMeals;