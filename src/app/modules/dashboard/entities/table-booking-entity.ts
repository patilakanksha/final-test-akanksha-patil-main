export interface TableBookingEntity {
  id: number;
  tableId: string;
  startTime: string; // You might want to use a Date type here depending on your needs
  endTime: string;
  status: string;
}
