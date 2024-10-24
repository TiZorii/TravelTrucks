import css from "./SearchForm.module.css";
// import Icon from "../../../public/icons/Icon";
import { useState, useCallback } from "react";
import { categories, vehicleTypes } from "../../data/vehicleData";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  location: Yup.string()
    .matches(
      /^[a-zA-Z\s]*$/,
      "Location can only contain Latin letters and spaces."
    )
    .max(20, "Location name cannot exceed 20 characters."),
});


export default function SearchForm ({
  filters,
  setFilters,
  onFilterChange,
  onSearchClick,
}) {
  const [localFilters, setLocalFilters] = useState(filters);

  const defaultFilters = ["AC", "transmission", "kitchen", "TV", "bathroom"];

  const handleCategoryClick = useCallback(
    (categoryName) => {
      let newFilters = { ...localFilters };
      if (categoryName === "transmission") {
        newFilters[categoryName] =
          localFilters[categoryName] === "automatic" ? null : "automatic";
      } else {
        newFilters[categoryName] = !localFilters[categoryName];
      }
      setLocalFilters(newFilters);
    },
    [localFilters]
  );

  const handleVehicleTypeClick = useCallback(
    (vehicleTypeName) => {
      let newFilters = { ...localFilters };
      newFilters.form =
        newFilters.form === vehicleTypeName ? null : vehicleTypeName;
      setLocalFilters(newFilters);
    },
    [localFilters]
  );

  const handleSearchClick = async (values, { setSubmitting }) => {
    const trimmedLocation = values.location.trim();
    
    const updatedFilters = { 
      ...localFilters, 
      location: trimmedLocation 
    };
    
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
    onSearchClick();
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        location: localFilters.location || "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSearchClick}
    >
      {({ isValid, isSubmitting }) => (
        <Form className={css.wrapper}>
          <div className={css.inputContainer}>
            <label className={css.inputLabel}>Location</label>
            <div className={css.inputField}>
              {/* <Icon name="icon-map" width={20} height={20} fill="#6C717B" /> */}
              <Field
                name="location"
                type="text"
                placeholder="City"
                className={css.input}
              />
            </div>
            <ErrorMessage
              name="location"
              component="div"
              className={css.errorMessage}
            />
          </div>

          <div className={css.categoryWrapper}>
            <label className={css.inputFil}>Filters</label>
            <h3 className={css.sectionTitle}>Vehicle equipment</h3>
            <hr className={css.hr} />

            <div className={css.categoryContainer}>
              {categories
                .filter((category) => defaultFilters.includes(category.name))
                .map((category) => (
                  <div
                    key={category.name}
                    className={`${css.category} ${
                      localFilters[category.name] ? css.active : ""
                    }`}
                    onClick={() => handleCategoryClick(category.name)}
                  >
                    {/* <Icon name={category.icon} /> */}
                    <span>{category.label}</span>
                  </div>
                ))}
            </div>
          </div>

          <div className={css.categoryWrapper}>
            <h3 className={css.sectionTitle}>Vehicle type</h3>
            <hr className={css.hr} />

            <div className={css.categoryContainer}>
              {vehicleTypes.map((type) => (
                <div
                  key={type.name}
                  className={`${css.category} ${
                    localFilters.form === type.name ? css.active : ""
                  }`}
                  onClick={() => handleVehicleTypeClick(type.name)}
                >
                  {/* <Icon name={type.icon} /> */}
                  <span>{type.label}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className={css.searchBtn}
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? "Searching..." : "Search"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { filterUse } from '../../redux/filter/filterSlice';
// import sprite from '../../images/sprite.svg';
// import styles from './SearchForm.module.css';


// export default function SearchForm () {
//   const dispatch = useDispatch();

//   const [location, setLocation] = useState('');
//   const [details, setDetails] = useState({
//     airConditioner: false,
//     automatic: false,
//     kitchen: false,
//     TV: false,
//     shower: false,
//   });
//   const [forms, setForms] = useState('');

//   const handleFilterCampers = event => {
//     event.preventDefault();
//     dispatch(filterUse({ location, details, forms }));
//   };

//   const filtersEquipment = [
//     {
//       value: 'airConditioner',
//       icon: 'icon-AC',
//       text: 'AC',
//     },
//     {
//       value: 'automatic',
//       icon: 'icon-automatic',
//       text: 'Automatic',
//     },
//     {
//       value: 'kitchen',
//       icon: 'icon-kitchen',
//       text: 'Kitchen',
//     },
//     {
//       value: 'TV',
//       icon: 'icon-TV',
//       text: 'TV',
//     },
//     {
//       value: 'shower',
//       icon: 'icon-shower',
//       text: 'Shower/WC',
//     },
//   ];

//   const filtersType = [
//     {
//       value: 'panelTruck',
//       icon: 'icon-van',
//       text: 'Van',
//     },
//     {
//       value: 'fullyIntegrated',
//       icon: 'icon-fully-integrated',
//       text: 'Fully Integrated',
//     },
//     {
//       value: 'alcove',
//       icon: 'icon-alcove',
//       text: 'Alcove',
//     },
//   ];

//   const handleLocation = event => {
//     const { value } = event.target;
//     setLocation(value);
//   };

//   const handleCheckbox = event => {
//     const { value, checked } = event.target;
//     setDetails({ ...details, [value]: checked });
//   };

//   const handleRadio = event => {
//     const { value } = event.target;
//     setForms(value);
//   };

//   return (
//     <form className={styles.form} onSubmit={handleFilterCampers}>
//       <label className={styles.locationLabel}>
//         Location
//         <svg>
//           <use href={`${sprite}#icon-map-pin`} />
//         </svg>
//         <input
//           type="text"
//           name="location"
//           value={location}
//           placeholder="City"
//           onChange={handleLocation}
//         />
//       </label>

//       <p className={styles.text}>Filters</p>

//       <h2 className={styles.title}>Vehicle equipment</h2>
//       <hr className={styles.hr} />
//       <div className={styles.wrap}>
//         {filtersEquipment.map(({ value, icon, text }) => (
//           <div className={styles.wrapContent} key={value}>
//             <input
//               type="checkbox"
//               name={value}
//               value={value}
//               checked={details[value]}
//               onChange={handleCheckbox}
//             />
//             <div className={styles.filterbutton}>
//               <svg width="32" height="32" fill="none" stroke="currentColor">
//                 <use href={`${sprite}#${icon}`} />
//               </svg>
//               {text}
//             </div>
//           </div>
//         ))}
//       </div>

//       <h2 className={styles.title}>Vehicle type</h2>
//       <hr className={styles.hr} />
//       <div className={styles.wrap}>
//         {filtersType.map(({ value, icon, text }) => (
//           <div className={styles.wrapContent} key={value}>
//             <input
//               type="radio"
//               name="vehicleType"
//               value={value}
//               checked={forms === value}
//               onChange={handleRadio}
//             />
//             <div className={styles.filterbutton}>
//               <svg width="40" height="28" fill="none" stroke="currentColor">
//                 <use href={`${sprite}#${icon}`} />
//               </svg>
//               {text}
//             </div>
//           </div>
//         ))}
//       </div>
//       <button type="submit" className={styles.searchButton}>Search</button>
//     </form>
//   );
// };

