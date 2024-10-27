import { NavLink } from "react-router-dom";
import css from "./Layout.module.css";
import clsx from "clsx";
import Loader from "../Loader/Loader";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";


const navLink =({isActive}) => {
    return clsx(css.link, isActive && css.active)
}

export default function Layout() {
  return (
    <div className={css.container}>
      <div className={css.header}>
        <nav className={css.nav}>
                <NavLink to="/" className={navLink}><img className={css.logo} src="/images/Logo.svg" alt="logo" /></NavLink>
                <NavLink to="/" className={navLink}>Home</NavLink>
          <NavLink
            to="/catalog"
            className={({ isActive}) => {
              return isActive && window.location.pathname === "/catalog"
                ? css.active 
                : css.link;
            }}
          >Catalog</NavLink>
        </nav>
        </div>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};
