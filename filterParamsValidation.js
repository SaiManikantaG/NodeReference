import { InvalidQueryParametersException } from '../utilities/customErrors';


/**
 *
 * @param {Object} optionalFilters
 * @param {Array} dailyOrderSupportedFilterList
 * @param {Array} providedFiltersArray
 */
export const checkForExistance = (
  optionalFilters,
  providedFiltersArray,
  // eslint-disable-next-line consistent-return
) => {
  const result = providedFiltersArray.every((element) => {
    if (giveRequestSupportedFunctionsList.includes(String(element).toLowerCase())) {
      return true;
    }
    throw new InvalidQueryParametersException(
      `${String(element).toLowerCase()}: is not a valid query parameter`,
    );
  });
  if (result) {
    return optionalFilters;
  }
};


/**
 *
 * @param {Object} optionalFilters
 * @param {String} request
 */
// eslint-disable-next-line consistent-return
export const validateOptionalFilters = (optionalFilters, request) => {
  const obtainedFilterArray = Object.keys(optionalFilters);

  const searchQueryFilters = [
    'itemid'
  ];
  const noFiltersSupportedList = [];

  if (request === NONE_ALLOWED) {
    return checkForExistance(
      optionalFilters,
      noFiltersSupportedList,
      obtainedFilterArray,
    );
  }
  if (request === SEARCH) {
    return checkForExistance(
      optionalFilters,
      searchQueryFilters,
      obtainedFilterArray,
    );
  }
};
