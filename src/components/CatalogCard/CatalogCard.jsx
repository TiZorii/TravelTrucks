import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { categories } from "../../data/vehicleData";
import Location from "../../components/Location/Location";
import { toggleFavorite} from "../../redux/campers/slice";
import { selectFavorites } from "../../redux/campers/selectors";
import sprite from "../../images/sprite.svg"
import css from "./CatalogCard.module.css";


export default function CatalogCard ({ camper }) {
    const dispatch = useDispatch();
    const favorites = useSelector(selectFavorites);
    const isFavorite = favorites.includes(camper.id);
    
    const defaultFeaturesOrder = ["transmission", "engine", "kitchen", "AC"];

    const features = defaultFeaturesOrder
        .map((featureName) =>
            categories.find((category) => category.name === featureName)
        )
        .filter((category) => category && camper[category.name])
        .map((category) => ({
            icon: category.icon,
            label: category.label,
        }));

    // const features = categories
    //     .filter((category) => camper[category.name])
    //     .map((category) => ({
    //         icon: category.icon,
    //         label: category.label,
    //     }));

  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(camper.id));
  };

  return (
    <div className={css.vehicleCard}>
      <div className={css.imgWrapper}>
        <img
          src={camper.gallery[0]?.thumb}
          alt={camper.name}
          className={css.vehicleImage}
        />
      </div>

      <div className={css.cardInfo}>
        <div className={css.cardTitle}>
          <h2 className={css.vehicleName}>{camper.name}</h2>
          <p className={css.vehiclePrice}>
            €{Number(camper.price).toFixed(2)}
          </p>
          <div
            className={`${css.likeIcon} ${isFavorite ? css.active : ""}`}
          >
            <svg 
            onClick={handleFavoriteClick} width={26} height={24}><use href={`${sprite}#icon-heart`} /></svg>
          </div>
        </div>

        <div className={css.additionalInfo}>
          <div className={css.ratingLocation}>
            <div className={css.ratingWrapper}>
                <svg width={16} height={16} fill="var(--rating-color)"><use href={`${sprite}#icon-star`} /></svg>
              <span>
                {camper.rating} ({camper.reviews?.length || 0} Reviews)
              </span>
            </div>

            <div className={css.locationWrapper}>
                <svg width={16} height={16}><use href={`${sprite}#icon-map`} /></svg>
              <Location location={camper.location} />
            </div>
          </div>
          <p className={css.description}>{camper.description.length > 70
            ? `${camper.description.substring(0,70)}...`
            : camper.description}</p>
        </div>

        <div className={css.featuresList}>
          {features.map((feature, index) => (
            <div key={index} className={css.featureItem}>
                  <svg width={20} height={20}><use href={`${sprite}#${feature.icon}`} /></svg>
              {feature.label}
            </div>
          ))}
        </div>
        <Link to={`/catalog/${camper.id}`} className={css.showMoreBtn}>
          Show more
        </Link>
      </div>
    </div>
  );
};
