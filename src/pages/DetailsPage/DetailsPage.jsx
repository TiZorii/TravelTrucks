import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCamperDetails } from "../../redux/campers/operations";
import { selectCamperDetails, selectCamperDetailsStatus } from "../../redux/campers/selectors";
import Reviews from "../../components/Reviews/Reviews";
import BookingForm from "../../components/BookingForm/BookingForm";
import Features from "../../components/Features/Features";
import Location from "../../components/Location/Location";
import sprite from "/images/sprite.svg";
import css from "./DetailsPage.module.css";
import Loader from "../../components/Loader/Loader";
import { animateScroll as scroll } from "react-scroll";

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

export default function DetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const camper = useSelector(selectCamperDetails);
  const status = useSelector(selectCamperDetailsStatus);
  const [activeTab, setActiveTab] = useState("features");
  const reviewsRef = useRef(null);

  useEffect(() => {
    dispatch(getCamperDetails(id));
    const storedTab = localStorage.getItem("activeTab");
    if (storedTab) {
      setActiveTab(storedTab);
    }
  }, [dispatch, id]);

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "reviews" && reviewsRef.current) {
      scroll.scrollTo(reviewsRef.current.offsetTop, {
        duration: 1500,
        smooth: "smooth",
      });
    }
  };

  if (status === "loading") {
    return <Loader />;
  }

  if (!camper) return null;

  return (
    <div className={css.detailsPage}>
      <div className={css.camperHeader}>
        <h2 className={css.camperName}>{camper.name}</h2>
        <div className={css.ratingLocation}>
          <div className={css.ratingWrapper} onClick={() => handleTabClick("reviews")}>
            <svg width={16} height={16} fill="var(--rating-color)">
              <use href={`${sprite}#icon-star`} />
            </svg>
            <span>
              {camper.rating} ({camper.reviews?.length || 0} Reviews)
            </span>
          </div>
          <div className={css.locationWrapper}>
            <svg width={16} height={16}><use href={`${sprite}#icon-map`} /></svg>
            <Location location={camper.location} />
          </div>
        </div>
        <p className={css.camperPrice}>€{Number(camper.price).toFixed(2)}</p>
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
          onClick={() => handleTabClick("features")}
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
        <div>
          {activeTab === "features" && <Features camper={camper} />}
          {activeTab === "reviews" && (
            <div ref={reviewsRef}>
              <Reviews reviews={camper.reviews} />
            </div>
          )}
        </div>

        <div className={css.bookingFormWrapper}>
          <BookingForm camperId={id} />
        </div>
      </div>
    </div>
  );
}