import { useEffect, useState } from "react";
import { BookingData } from "../models/IBookingData";
import { useNavigate } from "react-router";

interface BookingFormProps {
  booking?: BookingData;
  onSubmit: (updatedBooking: BookingData) => void;
  onCancel: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({
  onSubmit,
  booking,
  onCancel,
}) => {
  const [formData, setFormData] = useState<BookingData>(
    booking?.customerId
      ? booking
      : {
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
        }
  );
  const navigate = useNavigate();

  console.log("bla bla", formData);

  useEffect(() => {
    if (booking) setFormData(booking);
  }, [booking]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      if (["name", "lastname", "email", "phone"].includes(name)) {
        return {
          ...prevData,
          customer: {
            ...prevData.customer,
            [name]: value,
          },
        };
      }

      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    navigate("/admin");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Bokningsinformation</h2>
      <div>
        <label htmlFor="date">Datum:</label>
        <input
          id="date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="time">Tid:</label>
        <input
          id="time"
          name="time"
          type="time"
          value={formData.time}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="numberOfGuests">Antal gäster:</label>
        <input
          id="numberOfGuests"
          name="numberOfGuests"
          type="number"
          value={formData.numberOfGuests}
          onChange={handleChange}
        />
      </div>

      <h2>Kundinformation</h2>
      <div>
        <label htmlFor="name">Förnamn:</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.customer.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="lastname">Efternamn:</label>
        <input
          id="lastname"
          name="lastname"
          type="text"
          value={formData.customer.lastname}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">E-post:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.customer.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="phone">Telefon:</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.customer.phone}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Uppdatera</button>
      <button type="button" onClick={onCancel}>
        Avbryt
      </button>
    </form>
  );
};

export default BookingForm;
