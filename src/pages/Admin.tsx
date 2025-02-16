import { useState, useEffect } from "react";
import { get, remove } from "../services/CrudService";
import { useNavigate } from "react-router";
import {
  BookingData,
  BookingDataRespons,
  Customer,
} from "../models/IBookingData";

/*interface BookingWithCustomer extends BookingData {
  customer: {
    _id: string;
    name: string;
    lastname: string;
    email: string;
    phone: string;
  };
}*/

export default function Admin() {
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const bookingsData = await get<BookingDataRespons[]>(
        `https://school-restaurant-api.azurewebsites.net/booking/restaurant/67acc4a7f9568e2823b764ab`
      );

      const bookingWithCustomer = await Promise.all(
        bookingsData.map(async (booking) => {
          const customer = await get<Customer>(
            `https://school-restaurant-api.azurewebsites.net/customer/${booking.customerId}`
          );
          const customerData = Array.isArray(customer) ? customer[0] : customer;

          return { ...booking, customer: customerData };
        })
      );
      console.log("hej", bookingWithCustomer);

      setBookings(bookingWithCustomer);
    } catch (error) {
      setError(
        "Kunde inte hämta bokningar: " +
          (error instanceof Error ? error.message : "Ett okänt fel inträffade")
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (bookingId: string) => {
    try {
      await remove(
        `https://school-restaurant-api.azurewebsites.net/booking/delete/${bookingId}`
      );
      setBookings(bookings.filter((booking) => booking._id !== bookingId));
      alert("Bokningen har raderats!");
    } catch (error) {
      console.error("Kunde inte radera bokningen:", error);
    }
  };

  const handleUpdate = (bookingId: string) => {
    navigate(`/updatebooking/${bookingId}`);
  };

  const handleAddBooking = () => {
    navigate("/booking");
  };

  if (loading) {
    return <p>Laddar bokningar...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (bookings.length === 0) {
    return <p>Inga bokningar hittades.</p>;
  }

  return (
    <div>
      <h1>Adminpanel för bokningar</h1>
      <button onClick={handleAddBooking}>Lägg till ny bokning</button>
      <table>
        <thead>
          <tr>
            <th>Namn</th>
            <th>E-post</th>
            <th>Datum</th>
            <th>Tid</th>
            <th>Antal gäster</th>
            <th>Åtgärder</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{`${booking.customer.name} ${booking.customer.lastname}`}</td>
              <td>{booking.customer.email}</td>
              <td>{booking.date}</td>
              <td>{booking.time}</td>
              <td>{booking.numberOfGuests}</td>
              <td>
                <button onClick={() => handleUpdate(booking._id!)}>
                  Uppdatera
                </button>
                <button onClick={() => handleDelete(booking._id!)}>
                  Radera
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
