import styles from "./app.module.css";
import AppHeader from "../AppHeader/appHeader";
import BurgerIngridients from "../BurgerIngridients/burgerIngridients";
import BurgerConstructor from "../BurgerConstructor/burgerConstructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {  
  return (
    <div className={styles.app}>
      <AppHeader />
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
    </div>
  );
}

export default App;
