import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCampers } from "../../redux/campers/operations";
import { setFilters } from "../../redux/campers/slice";
import {
  selectCampers,
  selectFilters,
  selectCampersStatus,
} from "../../redux/campers/selectors";
import VehicleCard from "../../components/CatalogCard/CatalogCard";
import SearchForm from "../../components/SearchForm/SearchForm";
import css from "./CatalogPage.module.css";
import toast, { Toaster } from "react-hot-toast";

export default function Catalog () {
  const dispatch = useDispatch();
  const campers = useSelector(selectCampers);
  const filters = useSelector(selectFilters);
  const status = useSelector(selectCampersStatus);

  const [visibleCount, setVisibleCount] = useState(4);
  const [toastShown, setToastShown] = useState(false);
  const [isSearchClicked, setIsSearchClicked] = useState(false);

  useEffect(() => {
    if (isSearchClicked && status === "succeeded" && !toastShown) {
      toast.success("Campers loaded successfully!");
      setToastShown(true);
      setIsSearchClicked(false);
    } else if (isSearchClicked && status === "failed") {
      toast.dismiss("loading-toast");
      toast.error("No campers found with the specified filters");
      setToastShown(false);
      setIsSearchClicked(false);
    }
  }, [status, toastShown, isSearchClicked]);

  useEffect(() => {
    setVisibleCount(4);
    dispatch(getCampers(filters));
  }, [dispatch, filters]);

  const handleFilterChange = (newFilters) => {
    dispatch(setFilters(newFilters));
  };

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  return (
    <div className={css.catalogPage}>
      <Toaster position="top-right" reverseOrder={false} />

      <div className={css.filterContainer}>
        <SearchForm
          filters={filters}
          setFilters={handleFilterChange}
          onFilterChange={handleFilterChange}
          onSearchClick={() => setIsSearchClicked(true)}
        />
      </div>

      <div className={css.catalogContainer}>
        {status === "succeeded" &&
          campers
            .slice(0, visibleCount)
            .map((camper) => <VehicleCard key={camper.id} camper={camper} />)}

        {visibleCount < campers.length && (
          <button className={css.loadMoreBtn} onClick={handleLoadMore}>
            Load More
          </button>
        )}
      </div>
    </div>
  );
};
