import { categories } from "../../data/vehicleData";
import sprite from "/images/sprite.svg";
import css from "./Features.module.css";

export default function Features({ camper }) {
  const key = [
    "AC",
    "TV",
    "bathroom",
    "consumption",
    "engine",
    "form",
    "gas",
    "height",
    "kitchen",
    "length",
    "microwave",
    "radio",
    "refrigerator",
    "tank",
    "transmission",
    "water",
    "width",
  ];
  
  const features = key
    .map((featureName) =>
      categories.find((category) => category.name === featureName)
    )
    .filter((category) => category && camper[category.name])
    .map((category) => ({
      icon: category.icon,
      label: category.label,
    }));

  return (

    <div className={css.featuresWrapper}>
      <div className={css.equipment}>
        {features.map((feature, index) => (
          <div key={index} className={css.featureItem}>
            <svg width={20} height={20}>
              <use href={`${sprite}#${feature.icon}`} />
            </svg>
            {feature.label}
          </div>
        ))}
      </div>

      <div className={css.vehicleDetails}>
        <h3>Vehicle details</h3>
        <hr className={css.hr} />
        <ul>
          <li>
            <span>Form</span>
            <span>{(camper.form)}</span>
          </li>
          <li>
            <span>Length</span>
            <span>{camper.length}</span>
          </li>
          <li>
            <span>Width</span>
            <span>{camper.width}</span>
          </li>
          <li>
            <span>Height</span>
            <span>{camper.height}</span>
          </li>
          <li>
            <span>Tank</span>
            <span>{camper.tank}</span>
          </li>
          <li>
            <span>Consumption</span>
            <span>{camper.consumption}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}