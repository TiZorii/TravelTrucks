import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { animateScroll } from 'react-scroll';
import { getAdverts } from '../../redux/adverts/operations';
import {
  selectAdverts,
  selectError,
  selectIsLoading,
} from '../../redux/adverts/selectors';
import { filterUse } from '../../redux/filter/filterSlice';
import { selectFilter } from '../../redux/filter/selectors';
import { getFilteredAdverts } from '../../helpers/getFilteredAdverts';
import SearchForm from '../../components/SearchForm/SearchForm';
import CampersList from '../../components/CampersList/CampersList';
import Loader from '../../components/Loader/Loader';
import styles from './Catalog.module.css';

const Campers = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadMore, setIsLoadMore] = useState(true);

  const filters = useSelector(selectFilter);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const allAdverts = useSelector(selectAdverts);

  const advertsItemRef = useRef(null);

  useEffect(() => {
    dispatch(getAdverts({ page: currentPage, limit: 13 }));
  }, [dispatch, currentPage]);

  const filteredAdverts = getFilteredAdverts(allAdverts, filters);

  const loadMore = () => {
    setCurrentPage((prev) => prev + 1);

    const options = {
      duration: 1500,
      smooth: true,
    };

    animateScroll.scrollTo(advertsItemRef.current.offsetTop, options);
  };

  useEffect(() => {
    if (
      filteredAdverts.length < currentPage * 4 ||
      (filteredAdverts.length % 4 !== 0 &&
        currentPage * 4 >= filteredAdverts.length)
    ) {
      setIsLoadMore(false);
    } else {
      setIsLoadMore(true);
    }
  }, [filteredAdverts, currentPage]);

  useEffect(() => {
    return () => {
      dispatch(filterUse({ location: '', details: {}, forms: '' }));
    };
  }, [dispatch]);

  return (
    <div className={styles.container}>
      {isLoading && <Loader />}
      {error && <p>Error: {error}</p>}

      <SearchForm />

      <div className={styles.catalog}>
        <ul className={styles.advertsList}>
          {filteredAdverts.length > 0 ? (
            filteredAdverts.slice(0, currentPage * 4).map((advert) => (
              <li key={advert._id} className={styles.advertsItem} ref={advertsItemRef}>
                <CampersList advert={advert} />
              </li>
            ))
          ) : (
            <p className={styles.noResults}>Nothing was found for your filter</p>
          )}
        </ul>

        {isLoadMore && !isLoading && (
          <button className={styles.button} onClick={loadMore}>Load more</button>
        )}
      </div>
    </div>
  );
};

export default Campers;
