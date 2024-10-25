import { useEffect} from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCamperDetails } from "../../redux/campers/operations";
import { selectCamperDetails, selectCamperDetailsStatus} from "../../redux/campers/selectors";
import LocationFormatter from "../../components/Location/Location";
import sprite from "../../images/sprite.svg";
import css from "./DetailsPage.module.css";
import Loader from "../../components/Loader/Loader";

export default function DetailsPage () {
  const { id } = useParams();
  const dispatch = useDispatch();
  const camper = useSelector(selectCamperDetails);
  const status = useSelector(selectCamperDetailsStatus);

  useEffect(() => {
    dispatch(getCamperDetails(id));
  }, [dispatch, id]);

  if (status === "loading") {
    return <Loader />;
  }

  if (!camper) return null;

  return (
    <div className={css.detailsPage}>
      <div className={css.camperHeader}>
        <h2 className={css.camperName}>{camper.name}</h2>
        <div className={css.ratingLocation}>
          <div className={css.ratingWrapper}>
            <svg width={16} height={16} fill="var(--rating-color)" ><use href={`${sprite}#icon-star`} /></svg>
            <span>
              {camper.rating} ({camper.reviews?.length || 0} Reviews)
            </span>
          </div>
          <div className={css.locationWrapper}>
            <svg width={16} height={16}><use href={`${sprite}#icon-map`} /></svg>
            <LocationFormatter location={camper.location} />
          </div>
        </div>
        <p className={css.camperPrice}>€{camper.price}</p>
      </div>

    </div>
  );
};

