import sprite from "/images/sprite.svg";
import css from "./Reviews.module.css";


export default function Reviews ({ reviews }) {
  const getInitial = (name) => {
    return name.charAt(0).toUpperCase();
  };

  const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = rating;
    const starsArray = [];

    for (let i = 1; i <= totalStars; i++) {
      if (i <= filledStars) {
        starsArray.push(
          <svg key={i} width={16} height={16} fill="var(--rating-color)"> 
              <use href={`${sprite}#icon-star`} />
            </svg>
        );
      } else {
        starsArray.push(
          <svg key={i} width={16} height={16} fill="var(--badges-color)"> 
              <use href={`${sprite}#icon-star`} />
            </svg>
        );
      }
    }

    return starsArray;
  };

  return (
    <div className={css.reviewsContainer}>
      {reviews.map((review, index) => (
        <div key={index}>
          <div className={css.reviewHeader}>
            <div className={css.avatar}>{getInitial(review.reviewer_name)}</div>
            <div className={css.reviewerInfo}>
              <span className={css.reviewerName}>{review.reviewer_name}</span>
              <div className={css.starsWrapper}>
                {renderStars(review.reviewer_rating)}
              </div>
            </div>
          </div>
          <p className={css.reviewComment}>{review.comment}</p>
        </div>
      ))}
    </div>
  );
};