import styles from "./app.module.css";
import AppHeader from "../AppHeader/appHeader";
import BurgerIngridients from "../BurgerIngridients/burgerIngridients";
import BurgerConstructor from "../BurgerConstructor/burgerConstructor";
import React from 'react';

function App() {
  const [state, setState] = React.useState([]);
  
  React.useEffect(() => {
    const getData = async () => {
      
      fetch(`https://norma.nomoreparties.space/api/ingredients`)
      .then(res => res.ok ? res.json() : res.json().then((err) => Promise.reject(err)))
      .then(res => setState(res.data))
      .catch(err => console.log(err))
      // const data = res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
    }
    getData()
  }, [])
  
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <section className={styles.section}>
          <h1 className="text text_type_main-large mb-5">
            Соберите бургер
          </h1>
          <BurgerIngridients data={state} />
        </section>
        <section className={styles.section}>
          <BurgerConstructor data={state} />
        </section>
      </main>
    </div>
  );
}

export default App;
