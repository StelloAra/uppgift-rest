export interface Customer {
  _id: string;
  name: string;
  lastname: string;
  email: string;
  phone: string;
}

export interface BookingData {
  _id?: string | undefined;
  restaurantId: string;
  date: string;
  time: string;
  numberOfGuests: number;
  customer: Customer;
  customerId?: number;
}
export interface BookingDataRespons {
  restaurantId: string;
  date: string;
  time: string;
  numberOfGuests: number;
  customerId: number;
}
