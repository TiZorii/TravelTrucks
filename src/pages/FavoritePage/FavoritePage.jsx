import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCampers } from "../../redux/campers/operations";
import { selectCampers, selectFilters, selectCampersStatus, selectFavorites } from "../../redux/campers/selectors";
import VehicleCard from "../../components/CatalogCard/CatalogCard";
import css from "./FavoritePage.module.css";
import { animateScroll as scroll } from "react-scroll"
import Loader from "../../components/Loader/Loader";

export default function Catalog() {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const campers = useSelector(selectCampers);
  const filters = useSelector(selectFilters);
  const status = useSelector(selectCampersStatus);

  const [visibleCount, setVisibleCount] = useState(4);

  
  useEffect(() => {
    setVisibleCount(4);
    dispatch(getCampers(filters));
  }, [dispatch, filters]);
    
  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
    scroll.scrollMore(600, {
      duration: 800,
      smooth: "smooth",
    });
  };

  const displayedCampers = campers.filter((camper) => favorites.includes(camper.id));

  return (
    <div className={css.catalogPage}>
      <div className={css.catalogContainer}>
        {status === "succeeded" ? (
          displayedCampers.length > 0 ? (
            displayedCampers
              .slice(0, visibleCount)
              .map((camper) => <VehicleCard key={camper.id} camper={camper} />)
          ) : (
            <p className={css.emptyMessage}>No favorite campers found. Start adding some!</p>
          )
        ) : (
          <Loader/>
        )}

        {visibleCount < displayedCampers.length && (
          <button className={css.loadMoreBtn} onClick={handleLoadMore}>
            Load more
          </button>
        )}
      </div>
    </div>
  );
}
