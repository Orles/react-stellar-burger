import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeaderStyle from './appHeader.module.css';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

// activeClassName='text text_type_main-default'

function AppHeader() {
    const location = useLocation();
    return (
        <header className={`${AppHeaderStyle.header} mb-10`}>
            <div className={AppHeaderStyle.table}>
                <nav className={`${AppHeaderStyle.navigation} mt-4 mb-4`}>
                    <NavLink to='/' className={({ isActive }) =>
                        isActive ? `${AppHeaderStyle.activlink} text text_type_main-default pl-5 pr-5` : `${AppHeaderStyle.link} text text_type_main-default text_color_inactive pl-5 pr-5`
                    }>
                        <BurgerIcon type={location.pathname === '/' ? 'primary' : 'secondary'} />
                        Конструктор
                    </NavLink>

                    <NavLink to="/feed" className={({ isActive }) =>
                        isActive ? `${AppHeaderStyle.activlink} text text_type_main-default pl-5 pr-5` : `${AppHeaderStyle.link} text text_type_main-default text_color_inactive pl-5 pr-5`
                    }>
                        <ListIcon type={location.pathname === '/feed' ? 'primary' : 'secondary'} />
                        Лента заказов
                    </NavLink>
                </nav>
                <Logo />
                <NavLink to='/profile' className={({ isActive }) =>
                        isActive ? `${AppHeaderStyle.activlink} text text_type_main-default pl-5 pr-5` : `${AppHeaderStyle.link} text text_type_main-default text_color_inactive pl-5 pr-5`
                    }>
                    <ProfileIcon type={location.pathname === '/profile' || '/profile/orders' ? 'primary' : 'secondary'} />
                    Личный кабинет
                </NavLink>
            </div>
        </header>
    );
};

export default AppHeader;