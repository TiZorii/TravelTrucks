
export default function Trucks() {
  
  return (
    <div>
      <h1>Trucks Catalog</h1>
    </div>
  );
}


// import { useEffect, useRef, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// // import { animateScroll } from 'react-scroll';
// // import { getAdverts } from '../../redux/adverts/operations';
// // import {
// //   selectAdverts,
// //   selectError,
// //   selectIsLoading,
// // } from '../../redux/adverts/selectors';
// // import { filterUse } from '../../redux/filter/filterSlice';
// // import { selectFilter } from '../../redux/filter/selectors';
// // import { getFilteredAdverts } from '../../helpers/getFilteredAdverts';
// // import SearchForm from 'components/SearchForm/SearchForm';
// import TrucksList from 'components/TrucksList/TrucksList';
// // import Loader from 'components/Loader/Loader';
// // import {
// //   AdvertsItem,
// //   AdvertsList,
// //   Button,
// //   Catalog,
// //   Container,
// //   NoResults,
// // } from './Campers.styled';


// export default function Campers () {
//   const dispatch = useDispatch();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isLoadMore, setIsLoadMore] = useState(true);

// //   const filters = useSelector(selectFilter);
// //   const isLoading = useSelector(selectIsLoading);
// //   const error = useSelector(selectError);
// //   const allAdverts = useSelector(selectAdverts);

//   const advertsItemRef = useRef(null);

//   useEffect(() => {
//     dispatch(getAdverts({ page: currentPage, limit: 13 }));
//   }, [dispatch, currentPage]);

// //   const filteredAdverts = getFilteredAdverts(allAdverts, filters);

//   const loadMore = () => {
//     setCurrentPage(prev => prev + 1);

//     const options = {
//       duration: 1500,
//       smooth: true,
//     };

//     // animateScroll.scrollTo(advertsItemRef.current.offsetTop, options);
//   };

//   useEffect(() => {
//     if (
//       filteredAdverts.length < currentPage * 4 ||
//       (filteredAdverts.length % 4 !== 0 &&
//         currentPage * 4 >= filteredAdverts.length)
//     ) {
//       setIsLoadMore(false);
//     } else {
//       setIsLoadMore(true);
//     }
//   }, [filteredAdverts, currentPage]);

//   useEffect(() => {
//     return () => {
//       dispatch(filterUse({ location: '', details: {}, forms: '' }));
//     };
//   }, [dispatch]);

//   return (
//     <Container>
//       {isLoading && <Loader />}
//       {error && <p>Error: {error}</p>}

//       <SearchForm />

//       <Catalog>
//         <AdvertsList>
//           {filteredAdverts.length > 0 ? (
//             filteredAdverts.slice(0, currentPage * 4).map(advert => (
//               <AdvertsItem key={advert._id} ref={advertsItemRef}>
//                 <TrucksList advert={advert} />
//               </AdvertsItem>
//             ))
//           ) : (
//             <NoResults>Nothing was found for your filter</NoResults>
//           )}
//         </AdvertsList>

//         {isLoadMore && !isLoading && (
//           <Button onClick={loadMore}>Load more</Button>
//         )}
//       </Catalog>
//     </Container>
//   );
// };

