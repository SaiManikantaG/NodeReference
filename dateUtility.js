/* eslint-disable no-else-return */
/* eslint-disable new-cap */
/* eslint-disable no-undef */
/*
****
**** Usage: This is date utility function which can be used commonly across the application. Contains logic that includes
**** different operations/functionalaties with respect to dates
**** Author : Sai Manikant G
******* GET crazy as you go. We are building seperate common utility for this and will be integrated in future replacing this.
*/
require('dotenv').config();
const moment = require('moment-timezone');
const {
  YEAR_MONTH_DATE, HOURS_MINUTES, SECONDS_KEYWORD, DAYS_KEYWORD,
  DESC, ASC, YEARMONTHDATE, YMD_DASH, TIME_ZONE_CONSTANTS, NULL_STRING,
  MOMENT_TIME_ZONES_CODES, TIME_ZONE_CODES,
} = require('../constants');
const { ProcessException } = require('./customErrors.js');
const DEFAULT_TIME_ZONE = TIME_ZONE_CONSTANTS.UTC;

export const dateUtils = {

  utcDateWithoutZOne: inputDate => moment.utc(inputDate),

  localeDate: () => moment.tz(TIME_ZONE).toDate(),

  toDate: inputDate => moment.tz(inputDate, TIME_ZONE).toDate(),

  timeZoneToDate: (inputDate, timeZone) => moment.tz(inputDate, timeZone).toDate(),

  formatStringToDate: dateString => moment.tz(dateString, TIME_ZONE).format(),

  formatDateTOYMD: (dateString, timeZone) => moment.tz(dateString, timeZone || TIME_ZONE).format(YMD_DASH),

  formatDateTOYMDWithOutZone: date => moment.tz(date, DEFAULT_TIME_ZONE).format(YMD_DASH),

  /**
   * Irrespective of given time zone, take the date and keep the time stamp as empty i.e. '00:00:00' making it a proper UTC date.
   * @param {String} inputDate
   */
  getUTCDate: inputDate => moment.utc(inputDate).toDate(),

  addDaysToDates: (inputDate, numberOfDatesToAdd) => {
    const updatedDate = moment.tz(inputDate, YEAR_MONTH_DATE, DEFAULT_TIME_ZONE);
    const finalDate = updatedDate.add(numberOfDatesToAdd, DAYS_KEYWORD);
    return finalDate;
  },

  arrayStartDateFormated: (arrayOfDates) => {
    const formattingDate = dateUtils.formatDateTOYMD(arrayOfDates[0].date);
    return moment.tz(formattingDate, TIME_ZONE).toDate();
  },

  arrayEndDateFormated: (arrayOfDates) => {
    const formattingDate = dateUtils.formatDateTOYMD(arrayOfDates[arrayOfDates.length - 1].date);
    return moment.tz(formattingDate, TIME_ZONE).toDate();
  },

  removeTimeStampToDate: inputDate => dateUtils.getUTCDate(dateUtils.formatDateTOYMD(inputDate)),

  getCurrentDate: () => {
    if (TODAYS_DATE && TODAYS_DATE !== NULL_STRING) {
      return moment.tz(TODAYS_DATE, TIME_ZONE).toDate();
    }
    /**
     * Note: Formatting below to avoid the actual time stamp and set it to time zone based standard time removing the time stamp.
     */
    const formattedDate = dateUtils.formatDateTOYMD(moment.tz(TIME_ZONE).toDate());
    return moment.tz(formattedDate, TIME_ZONE).toDate();
  },

  getCurrentTimeHHMM: () => moment().format(HOURS_MINUTES),

  isAfterTenAM: () => {
    // JUST to set the value truly as 10:00 AM.
    const endTime = moment.tz(TIME_ZONE);
    const checkTime = moment.tz({
      hours: 10,
      minute: 0,
    }, TIME_ZONE);
    return endTime.isAfter(checkTime);
  },

  getDifferenceOfTimeStamps: (firstTimeStamp, secondTimeStamp) => {
    const a = moment(secondTimeStamp);
    return (a.diff(firstTimeStamp, SECONDS_KEYWORD));
  },

  getDayoftheDate: (inputDate) => {
    const dod = moment.tz(inputDate, DEFAULT_TIME_ZONE).toDate();
    /**
     * NOTE: Moment set Sunday-Saturday as 0-6 so if 0 i.e. Sunday set it to 7 as in legacy.
     */
    return dod.getUTCDay() === 0 ? 7 : dod.getUTCDay();
  },

  compareTwoTimesHHMM: (inputTime, compareTime) => {
    try {
      const beginningTime = moment(inputTime, HOURS_MINUTES);
      const endTime = moment(compareTime, HOURS_MINUTES);
      return beginningTime.isBefore(endTime);
    } catch (error) {
      logger.error('While Comparing two time stamps in date utils', {
        trace: error,
        inputTime,
        compareTime,
      });
      throw new ProcessException(`in dateUtils:${error}`);
    }
  },
  /**
   *
   * @param {array of dates to sort} array
   * @param {allowed values are 'DESC' or 'ASC'} sortingMethod
   */
  sortDates: (array, sortingMethod) => {
    if (sortingMethod.toUpperCase() === DESC) {
      const SortedArray = array.sort((b, a) => new moment(a.date).format(YEARMONTHDATE) - new moment(b.date).format(YEARMONTHDATE));
      return SortedArray;
    }
    if (sortingMethod.toUpperCase() === ASC) {
      const SortedArray = array.sort((a, b) => new moment(a.date).format(YEARMONTHDATE) - new moment(b.date).format(YEARMONTHDATE));
      return SortedArray;
    }
    return 'Only DESC or ASC are allowed values for sortingMethod';
  },

  currentTimeGreateThanEqualHHMM: (inputTime, compareTime) => {
    const beginningTime = moment.tz(inputTime, HOURS_MINUTES, TIME_ZONE);
    const endTime = moment.tz(compareTime, HOURS_MINUTES, TIME_ZONE);
    return beginningTime.isSameOrAfter(endTime);
  },

  inputDate1Greater: (inputDate1, inputDate2) => moment.tz(inputDate1, TIME_ZONE).isAfter(moment.tz(inputDate2, TIME_ZONE)),

  inputDate1GreaterEqual: (inputDate1, inputDate2) => moment.tz(inputDate1, TIME_ZONE).isSameOrAfter(moment.tz(inputDate2, TIME_ZONE)),

  inputDate2Greater: (inputDate1, inputDate2) => moment.tz(inputDate1, TIME_ZONE).isBefore(moment.tz(inputDate2, TIME_ZONE)),

  inputDate2GreaterEqual: (inputDate1, inputDate2) => moment.tz(inputDate1, TIME_ZONE).isSameOrBefore(moment.tz(inputDate2, TIME_ZONE)),

  compareDates: (inputDate1, inputDate2) => moment.tz(inputDate1, TIME_ZONE).isSame(moment.tz(inputDate2, TIME_ZONE)),

  isAfterWithoutZone: (inputDate1, inputDate2) => moment.tz(inputDate1, DEFAULT_TIME_ZONE).isAfter(moment.tz(inputDate2, DEFAULT_TIME_ZONE)),

  inBetweenDates: (startDate, inputDate, endDate) => moment.tz(inputDate, TIME_ZONE).isBetween(startDate, endDate),

  inBetweenDatesWithoutZone: (startDate, inputDate, endDate) => moment.tz(inputDate, DEFAULT_TIME_ZONE).isBetween(startDate, endDate),

  // inBetweenDatesEqual: (startDate, inputDate, endDate) => moment.tz(startDate, TIME_ZONE).format(YEAR_MONTH_DATE) <= moment.tz(inputDate, TIME_ZONE).format(YEARMONTHDATE)
  //   && moment.tz(inputDate, TIME_ZONE).format(YEARMONTHDATE) <= moment.tz(endDate, TIME_ZONE).format(YEARMONTHDATE),

  // TODO: Check this later as most important for forecast sales in GR
  inBetweenDatesEqual: (startDate, inputDate, endDate) => {
    const start = moment.tz(moment.tz(startDate, DEFAULT_TIME_ZONE).format(YMD_DASH), DEFAULT_TIME_ZONE);
    const checkDate = moment.tz(moment.tz(inputDate, DEFAULT_TIME_ZONE).format(YMD_DASH), DEFAULT_TIME_ZONE);
    const end = moment.tz(moment.tz(endDate, DEFAULT_TIME_ZONE).format(YMD_DASH), DEFAULT_TIME_ZONE);

    if (start.isSameOrBefore(checkDate) && checkDate.isSameOrBefore(end)) {
      return true;
      // eslint-disable-next-line no-else-return
    } else {
      return false;
    }
  },

  dayOfTheWeek: (date, timezone = TIME_ZONE) => moment(date).tz(timezone).isoWeekday(),

  calculateProcessingTime: (startTime, endTime) => ((endTime.getTime() - startTime.getTime()) / 1000) / 60,

  convertTimeZoneToMatchMoment: (timezone) => {
    let finalTimeZone;
    if ((timezone).toUpperCase() === 'C' || (timezone).toUpperCase() === TIME_ZONE_CODES.CST || (timezone).toUpperCase() === 'CDT' || (timezone).toUpperCase() === 'CT') {
      finalTimeZone = MOMENT_TIME_ZONES_CODES.CST;
    } else if ((timezone).toUpperCase() === 'E' || (timezone).toUpperCase() === TIME_ZONE_CODES.EST || (timezone).toUpperCase() === 'EDT' || (timezone).toUpperCase() === 'ET') {
      finalTimeZone = MOMENT_TIME_ZONES_CODES.EST;
    } else if ((timezone).toUpperCase() === 'P' || (timezone).toUpperCase() === TIME_ZONE_CODES.PST || (timezone).toUpperCase() === 'PDT' || (timezone).toUpperCase() === 'PT') {
      finalTimeZone = MOMENT_TIME_ZONES_CODES.PST;
    } else if ((timezone).toUpperCase() === 'M' || (timezone).toUpperCase() === TIME_ZONE_CODES.MST || (timezone).toUpperCase() === 'MDT' || (timezone).toUpperCase() === 'MT') {
      finalTimeZone = MOMENT_TIME_ZONES_CODES.MST;
    } else {
      finalTimeZone = timezone;
    }
    return finalTimeZone;
  },

  convertMomentToRegularZone: (momentTimeZone) => {
    let finalZone;
    if (momentTimeZone === MOMENT_TIME_ZONES_CODES.CST) {
      finalZone = TIME_ZONE_CODES.CST;
    } else if (momentTimeZone === MOMENT_TIME_ZONES_CODES.EST) {
      finalZone = TIME_ZONE_CODES.EST;
    } else if (momentTimeZone === MOMENT_TIME_ZONES_CODES.PST) {
      finalZone = TIME_ZONE_CODES.PST;
    } else if (momentTimeZone === MOMENT_TIME_ZONES_CODES.MST) {
      finalZone = TIME_ZONE_CODES.MST;
    } else if (momentTimeZone === DEFAULT_TIME_ZONE) {
      finalZone = DEFAULT_TIME_ZONE;
    } else {
      finalZone = momentTimeZone;
    }
    return finalZone;
  },

  DEFAULT_TIME_ZONE,
};
