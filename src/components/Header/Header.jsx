import css from './Header.module.css';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

const navLink =({isActive}) => {
    return clsx(css.link, isActive && css.active)
}

export default function Header() {
    return (
        <div className={css.header}>
            <nav className={css.nav}>
                <NavLink to='/' className={navLink}><img className={css.logo} src="/src/images/Logo.svg" alt="logo" /></NavLink>
                <NavLink to='/' className={navLink}>Home</NavLink>
                <NavLink to='/catalog' className={navLink}>Catalog</NavLink>
            </nav>
        </div>
    )
}