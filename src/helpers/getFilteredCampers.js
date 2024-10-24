export const getFilteredCampers = (allCampers, filters) => {
  if (
    Object.values(filters.details).every(el => Boolean(el) === false) &&
    !filters.location &&
    !filters.forms
  ) {
    return allCampers;
  }

  return allCampers.filter(camper => {
    if (
      filters.location &&
      !camper.location.toLowerCase().includes(filters.location.toLowerCase())
    ) {
      return false;
    }

    const { airConditioner, automatic, kitchen, TV, shower } = filters.details;
    if (
      (airConditioner && (!camper.details || !camper.details.airConditioner)) ||
      (automatic && camper.transmission !== 'automatic') ||
      (kitchen && (!camper.details || !camper.details.kitchen)) ||
      (TV && (!camper.details || !camper.details.TV)) ||
      (shower && (!camper.details || !camper.details.shower))
    ) {
      return false;
    }

    return !(filters.forms && camper.form !== filters.forms);
  });
};