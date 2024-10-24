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
import css from "./Catalog.module.css";
import toast, { Toaster } from "react-hot-toast";
// import CatalogLoader from "../../components/CatalogLoader/CatalogLoader";

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
      <Toaster position="top-center" reverseOrder={false} />

      <div className={css.filterContainer}>
        <SearchForm
          filters={filters}
          setFilters={handleFilterChange}
          onFilterChange={handleFilterChange}
          onSearchClick={() => setIsSearchClicked(true)}
        />
      </div>

      <div className={css.catalogContainer}>
        {/* {status === "loading" && <CatalogLoader />} */}

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


// import { useEffect, useRef, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { animateScroll } from 'react-scroll';
// import { getAdverts } from '../../redux/campers/operations';
// import {
//   selectAdverts,
//   selectError,
//   selectIsLoading,
// } from '../../redux/campers/selectors';
// import { filterUse } from '../../redux/filter/filterSlice';
// import { selectFilter } from '../../redux/filter/selectors';
// import { getFilteredAdverts } from '../../helpers/getFilteredAdverts';
// import SearchForm from '../../components/SearchForm/SearchForm';
// import CampersList from '../../components/CampersList/CampersList';
// import Loader from '../../components/Loader/Loader';
// import styles from './Catalog.module.css';

// const Campers = () => {
//   const dispatch = useDispatch();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isLoadMore, setIsLoadMore] = useState(true);

//   const filters = useSelector(selectFilter);
//   const isLoading = useSelector(selectIsLoading);
//   const error = useSelector(selectError);
//   const allAdverts = useSelector(selectAdverts);

//   const advertsItemRef = useRef(null);

//   useEffect(() => {
//     dispatch(getAdverts({ page: currentPage, limit: 13 }));
//   }, [dispatch, currentPage]);

//   const filteredAdverts = getFilteredAdverts(allAdverts, filters);

//   const loadMore = () => {
//     setCurrentPage((prev) => prev + 1);

//     const options = {
//       duration: 1500,
//       smooth: true,
//     };

//     animateScroll.scrollTo(advertsItemRef.current.offsetTop, options);
//   };

//   useEffect(() => {
//     if (
//       filteredAdverts.length < currentPage * 4 ||
//       (filteredAdverts.length % 4 !== 0 &&
//         currentPage * 4 >= filteredAdverts.length)
//     ) {
//       setIsLoadMore(false);
//     } else {
//       setIsLoadMore(true);
//     }
//   }, [filteredAdverts, currentPage]);

//   useEffect(() => {
//     return () => {
//       dispatch(filterUse({ location: '', details: {}, forms: '' }));
//     };
//   }, [dispatch]);

//   return (
//     <div className={styles.container}>
//       {isLoading && <Loader />}
//       {error && <p>Error: {error}</p>}

//       <SearchForm />

//       <div className={styles.catalog}>
//         <ul className={styles.advertsList}>
//           {filteredAdverts.length > 0 ? (
//             filteredAdverts.slice(0, currentPage * 4).map((advert) => (
//               <li key={advert._id} className={styles.advertsItem} ref={advertsItemRef}>
//                 <CampersList advert={advert} />
//               </li>
//             ))
//           ) : (
//             <p className={styles.noResults}>Nothing was found for your filter</p>
//           )}
//         </ul>

//         {isLoadMore && !isLoading && (
//           <button className={styles.button} onClick={loadMore}>Load more</button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Campers;
