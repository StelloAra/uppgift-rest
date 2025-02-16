import { useNavigate } from "react-router";
import BookingForm from "./BookingForm";
import { BookingData } from "../models/IBookingData";

const AddBooking = () => {
  const navigate = useNavigate();

  const handleCreate = async (bookingData: BookingData) => {
    try {
      const response = await fetch(
        "https://school-restaurant-api.azurewebsites.net/booking/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        }
      );

      const text = await response.text();
      console.log("API Response:", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("API returnerade inte giltig JSON");
      }

      if (!response.ok) {
        throw new Error(`Fel vid skapande: ${data.message || "Okänt fel"}`);
      }

      alert("Bokning skapad!");
    } catch (error) {
      console.error("Kunde inte skapa bokningen:", error);
    }
  };

  return (
    <div>
      <h1>Lägg till bokning</h1>
      <BookingForm
        onSubmit={handleCreate}
        onCancel={() => navigate("/admin")}
      />
    </div>
  );
};

export default AddBooking;
