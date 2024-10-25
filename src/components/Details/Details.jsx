// import { useState } from 'react';
// import sprite from '../../images/Icons/icons.svg';
// import css from './Details.module.css';
// import Features from 'components/Features/Features';
// import Reviews from 'components/Reviews/Reviews';
// import BookingForm from 'components/BookingForm/BookingForm';

// export default function Details({ advert }) {
//   const [activeTab, setActiveTab] = useState('');

//   return (
//     <div className={css.wrap}>
//       <p className={css.title}>{advert.name}</p>

//       <div className={css.ratingWrap}>
//         <p style={{ textDecorationLine: 'underline' }}>
//           <svg width="16" height="16" fill="#FFC531">
//             <use href={`${sprite}#icon-star`} />
//           </svg>
//           {advert.rating} ({advert.reviews.length} Reviews)
//         </p>

//         <p>
//           <svg width="16" height="16" fill="none" stroke="currentColor">
//             <use href={`${sprite}#icon-map-pin`} />
//           </svg>
//           {advert.location.split(',').reverse().join(', ')}
//         </p>
//       </div>

//       <p className={css.price}>€{advert.price.toFixed(2)}</p>

//       <div className={css.wrapOverlay}>
//         <div className={css.mainWrap}>
//           <ul className={css.imgList}>
//             {advert.gallery.length > 0 &&
//               advert.gallery.map(link => (
//                 <li key={link}>
//                   <img src={link} alt={advert.name} />
//                 </li>
//               ))}
//           </ul>

//           <p className={css.description}>{advert.description}</p>
//         </div>

//         <div className={css.tabs}>
//           <button
//             type="button"
//             onClick={() => setActiveTab('features')}
//             className={`${css.tabButton} ${activeTab === 'features' ? 'active' : ''}`}
//           >
//             Features
//           </button>
//           <button
//             type="button"
//             onClick={() => setActiveTab('reviews')}
//             className={`${css.tabButton} ${activeTab === 'reviews' ? 'active' : ''}`}
//           >
//             Reviews
//           </button>
//           <hr />
//         </div>

//         {activeTab === 'features' && (
//           <div className={css.tabsContent}>
//             <Features advert={advert} />
//             <BookingForm />
//           </div>
//         )}
//         {activeTab === 'reviews' && (
//           <div className={css.tabsContent}>
//             <Reviews advert={advert} />
//             <BookingForm />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
