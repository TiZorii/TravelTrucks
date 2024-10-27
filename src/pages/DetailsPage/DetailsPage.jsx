import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCamperDetails } from "../../redux/campers/operations";
import { selectCamperDetails, selectCamperDetailsStatus} from "../../redux/campers/selectors";
import Reviews from "../../components/Reviews/Reviews";
import BookingForm from "../../components/BookingForm/BookingForm";
import Features from "../../components/Features/Features";
import Location from "../../components/Location/Location";
import sprite from "/images/sprite.svg";
import css from "./DetailsPage.module.css";
import Loader from "../../components/Loader/Loader";

export default function DetailsPage () {
  const { id } = useParams();
  const dispatch = useDispatch();
  const camper = useSelector(selectCamperDetails);
  const status = useSelector(selectCamperDetailsStatus);
  const [activeTab, setActiveTab] = useState("features");
  const Gallery = ({ images }) => {
   return (
    <div className={css.galleryContainer}>
      {images.map((image, index) => (
        <img
          key={index}
          src={image.thumb}
          alt={`Camper Image ${index + 1}`}
          className={css.galleryImage}
        />
      ))}
    </div>
   );
  };
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
            <Location location={camper.location} />
          </div>
        </div>
        <p className={css.camperPrice}>€{camper.price}</p>
      </div>

      <div className={css.camperInfo}>
        <div className={css.galleryWrapper}>
          {camper.gallery && <Gallery images={camper.gallery} />}
        </div>
        <p className={css.desc}>{camper.description}</p>
      </div>

      <div className={css.tabsWrapper}>
        <button
          className={activeTab === "features" ? css.activeTab : ""}
          onClick={() => setActiveTab("features")}
        >
          Features
        </button>
        <button
          className={activeTab === "reviews" ? css.activeTab : ""}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>

      <div className={css.detailsContent}>
        <div
          className={
            activeTab === "features"
              ? css.featuresContent
              : css.reviewsConten
          }
        >
          {activeTab === "features" && <Features camper={camper} />}
          {activeTab === "reviews" && <Reviews reviews={camper.reviews} />}
        </div>

        <div className={css.bookingFormWrapper}>
          <BookingForm camperId={id} />
        </div>
      </div>
    </div>
  );
};

