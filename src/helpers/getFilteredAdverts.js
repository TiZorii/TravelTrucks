export const getFilteredAdverts = (allAdverts, filters) => {
  if (
    Object.values(filters.details).every(el => Boolean(el) === false) &&
    !filters.location &&
    !filters.forms
  ) {
    return allAdverts;
  }

  return allAdverts.filter(advert => {
    if (
      filters.location &&
      !advert.location.toLowerCase().includes(filters.location.toLowerCase())
    ) {
      return false;
    }

    const { airConditioner, automatic, kitchen, TV, shower } = filters.details;
    if (
      (airConditioner && (!advert.details || !advert.details.airConditioner)) ||
      (automatic && advert.transmission !== 'automatic') ||
      (kitchen && (!advert.details || !advert.details.kitchen)) ||
      (TV && (!advert.details || !advert.details.TV)) ||
      (shower && (!advert.details || !advert.details.shower))
    ) {
      return false;
    }

    return !(filters.forms && advert.form !== filters.forms);
  });
};