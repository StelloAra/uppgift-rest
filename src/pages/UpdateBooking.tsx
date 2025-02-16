import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { BookingData, Customer } from "../models/IBookingData";
import { get, update } from "../services/CrudService";
import BookingForm from "./BookingForm";

export default function UpdateBooking() {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<BookingData>({
    restaurantId: "67acc4a7f9568e2823b764ab",
    date: "",
    time: "",
    numberOfGuests: 0,
    customer: {
      name: "",
      lastname: "",
      phone: "",
      email: "",
      _id: "",
    },
  });

  useEffect(() => {
    console.log("hej Patrik");
    if (!bookingId) return;

    const fetchBooking = async () => {
      try {
        const bookingData = await get<BookingData>(
          `https://school-restaurant-api.azurewebsites.net/booking/${bookingId}`
        );
        const bookingd = Array.isArray(bookingData)
          ? bookingData[0]
          : bookingData;

        console.log("booking", bookingd);

        const customer = await get<Customer>(
          `https://school-restaurant-api.azurewebsites.net/customer/${bookingd.customerId}`
        );
        const customerData = Array.isArray(customer) ? customer[0] : customer;
        console.log("customerdata", customerData);

        setBooking({ ...bookingd, customer: customerData });
        console.log("booking1", booking);
      } catch (error) {
        console.error("Kunde inte hämta bokningen:", error);
      }
    };

    fetchBooking();
  }, [booking]);

  const handleUpdate = async (updatedBooking: BookingData) => {
    if (!bookingId) return;

    try {
      await update<BookingData, BookingData>(
        `https://school-restaurant-api.azurewebsites.net/booking/update/${bookingId}`,
        updatedBooking
      );
      alert("Bokningen uppdaterades!");
      navigate("/admin");
    } catch (error) {
      console.error("Kunde inte uppdatera bokningen:", error);
    }
  };

  if (!booking) return <p>Laddar bokningsinformation...</p>;

  return (
    <div>
      <h1>Uppdatera Bokning</h1>
      <BookingForm
        booking={booking}
        onSubmit={handleUpdate}
        onCancel={() => navigate("/admin")}
      />
    </div>
  );
}
