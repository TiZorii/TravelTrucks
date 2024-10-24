import { useDispatch, useSelector } from 'react-redux';
import { selectFavorites } from '../../redux/adverts/selectors';
import { addFavorite, removeFavorite } from '../../redux/adverts/advertsSlice';
import sprite from '../../images/sprite.svg';
import styles from './CampersList.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CampersList = ({ advert }) => {
  const dispatch = useDispatch();

  const favorites = useSelector(selectFavorites);
  const favoriteItem = favorites.findIndex(item => item._id === advert._id);

  const toggleFavorite = () => {
    if (favoriteItem === -1) {
      dispatch(addFavorite(advert));
      toast.success('Successfully added to Favorites!', {
        theme: 'colored',
        autoClose: 2500,
      });
      return;
    }
    dispatch(removeFavorite(advert._id));
  };

  return (
    <>
      <img src={advert.gallery[0]} alt={advert.name} className={styles.img} />
      <div className={styles.advertsWrap}>
        <div className={styles.titleWrap}>
          <p className={styles.title}>{advert.name}</p>
          <div className={styles.priceWrap}>
            <p className={styles.price}>€{advert.price.toFixed(2)}</p>
            <button onClick={toggleFavorite} className={styles.heartButton}>
              {favoriteItem === -1 ? (
                <svg width="24" height="24" fill="none" stroke="currentColor">
                  <use href={`${sprite}#icon-heart`} />
                </svg>
              ) : (
                <svg width="24" height="24" fill="#e44848" stroke="#e44848">
                  <use href={`${sprite}#icon-heart`} />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className={styles.ratingWrap}>
          <p style={{ textDecorationLine: 'underline' }}>
            <svg width="16" height="16" fill="#FFC531">
              <use href={`${sprite}#icon-star`} />
            </svg>
            {advert.rating} ({advert.reviews.length} Reviews)
          </p>

          <p>
            <svg width="16" height="16" fill="none" stroke="currentColor">
              <use href={`${sprite}#icon-map-pin`} />
            </svg>
            {advert.location.split(',').reverse().join(', ')}
          </p>
        </div>

        <p className={styles.description}>{advert.description}</p>

        <ul className={styles.categoriesList}>
          <li className={styles.categoriesItem}>
            <svg width="20" height="20">
              <use href={`${sprite}#icon-adults`} />
            </svg>
            {advert.adults} adults
          </li>

          <li className={styles.categoriesItem} style={{ textTransform: 'capitalize' }}>
            <svg width="20" height="20" fill="none" stroke="currentColor">
              <use href={`${sprite}#icon-automatic`} />
            </svg>
            {advert.transmission}
          </li>

          <li className={styles.categoriesItem} style={{ textTransform: 'capitalize' }}>
            <svg width="20" height="20">
              <use href={`${sprite}#icon-petrol`} />
            </svg>
            {advert.engine}
          </li>

          {advert.details.kitchen >= 1 && (
            <li className={styles.categoriesItem}>
              <svg width="20" height="20" fill="none" stroke="currentColor">
                <use href={`${sprite}#icon-kitchen`} />
              </svg>
              Kitchen
            </li>
          )}

          <li className={styles.categoriesItem}>
            <svg width="20" height="20" fill="none" stroke="currentColor">
              <use href={`${sprite}#icon-beds`} />
            </svg>
            {advert.details.beds} beds
          </li>

          {advert.details.airConditioner >= 1 && (
            <li className={styles.categoriesItem}>
              <svg width="20" height="20" fill="none">
                <use href={`${sprite}#icon-AC`} />
              </svg>
              AC
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default CampersList;
