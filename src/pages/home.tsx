import styles from "../components/app/app.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerConstructor from "../components/burgerConstructor/burgerConstructor";
import BurgerIngridients from "../components/burgerIngridients/burgerIngridients";
import { FC } from "react";

const Home: FC = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <main className={styles.main}>
                <section className={styles.section}>
                    <h1 className="text text_type_main-large mb-5">
                        Соберите бургер
                    </h1>
                    <BurgerIngridients />
                </section>
                <section className={styles.section}>
                    <BurgerConstructor />
                </section>
            </main>
        </DndProvider>
    )
}

export default Home;