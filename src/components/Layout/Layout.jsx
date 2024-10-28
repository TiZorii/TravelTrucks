import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import css from "./Layout.module.css";
import clsx from "clsx";
import Loader from "../Loader/Loader";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { selectFavorites } from "../../redux/campers/selectors";
import sprite from "/images/sprite.svg";

const navLinkClass = ({ isActive }) => clsx(css.link, isActive && css.active);

export default function Layout() {
  const favorites = useSelector(selectFavorites);

  return (
    <div className={css.container}>
      <div className={css.header}>
        <nav className={css.nav}>
          <NavLink to="/">
            <img className={css.logo} src="/images/Logo.svg" alt="logo" />
          </NavLink>
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/catalog" className={navLinkClass}>Catalog</NavLink>
          
          {favorites.length > 0 && (
            <NavLink to="/favorite" className={css.fav}>
              <svg width={26} height={24} fill="var(--button-color)">
                <use href={`${sprite}#icon-heart`} />
              </svg>
            </NavLink>
          )} 
        </nav>
      </div>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};
