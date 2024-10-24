export const selectCampers = (state) => state.campers.campers;
export const selectFilters = (state) => state.campers.filters;
export const selectCampersStatus = (state) => state.campers.status;
export const selectFavorites = (state) => state.campers.favorites;
export const selectCamperDetails = (state) => state.campers.camperDetails;
export const selectCamperDetailsStatus = (state) =>
  state.campers.camperDetailsStatus;
export const selectNoResults = (state) => state.campers.noResults;

// export const selectAdverts = state => state.adverts.adverts;

// export const selectFavorites = state => state.adverts.favorites;

// export const selectIsLoading = state => state.adverts.isLoading;

// export const selectError = state => state.adverts.error;