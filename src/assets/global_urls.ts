export const BASE_URL = 'http://localhost:5261/';

export const END_POINT = {
  LOGIN: 'api/Account',
  REFRESH_TOKEN: 'api/Account/Refresh',

  GET_TABLES: 'api/Table/List',
  SAVE_TABLE: 'api/Table/Add',
  UPDATE_TABLE: 'api/Table/Update',
  DELETE_TABLE: 'api/Table/Delete',

  GET_TABLE_BOOKING: 'api/Booking/List',
  SAVE_BOOKING_TABLE: 'api/Booking',
  UPDATE_BOOKING_TABLE: 'api/Booking/Update',
  DELETE_BOOKING_TABLE: 'api/Booking/Delete',

  // json db
  // GET_TABLES: 'tables',
  // DELETE_TABLE: 'tables/',
  // SAVE_TABLE: 'tables',
  // UPDATE_TABLE: 'tables/',

  // GET_TABLE_BOOKING: 'bookingTable',
  // DELETE_BOOKING_TABLE: 'bookingTable/',
  // SAVE_BOOKING_TABLE: 'bookingTable',
  // UPDATE_BOOKING_TABLE: 'bookingTable/',
};
