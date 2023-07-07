import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeaderStyle from './appHeader.module.css';

function AppHeader() {
    return (
        <header className={`${AppHeaderStyle.header} mb-10`}>
            <div className={AppHeaderStyle.table}>
                <nav className={`${AppHeaderStyle.navigation} mt-4 mb-4`}>
                    <a href="#" className={`${AppHeaderStyle.link} text text_type_main-default pl-5 pr-5`}>
                        <BurgerIcon type="primary" />
                        Конструктор
                    </a>
                    <a href="#" className={`${AppHeaderStyle.link} text text_type_main-default text_color_inactive pl-5 pr-5`}>
                        <ListIcon type="secondary" />
                        Лента заказов
                    </a>
                </nav>
                <Logo />
                <a href="#" className={`${AppHeaderStyle.link} text text_type_main-default text_color_inactive pl-5 pr-5`}>
                    <ProfileIcon type="secondary" />
                    Личный кабинет
                </a>
            </div>
        </header>
    );
};

export default AppHeader;