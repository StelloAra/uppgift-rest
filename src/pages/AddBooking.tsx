import { useNavigate } from "react-router";
import { post } from "../services/CrudService";
import BookingForm from "./BookingForm";

const API_URL =
  "https://school-restaurant-api.azurewebsites.net/booking/create";
const RESTAURANT_ID = "67acc4a7f9568e2823b764ab";

export default function AddBooking() {
  const navigate = useNavigate();

  const handleCreate = async (formData: any) => {
    try {
      const bookingData = {
        restaurantId: RESTAURANT_ID,
        ...formData,
        numberOfGuests: Number(formData.numberOfGuests),
        customer: {
          name: formData.name,
          lastname: formData.lastname,
          email: formData.email,
          phone: formData.phone,
        },
      };

      await post(API_URL, bookingData);
      alert("Bokning skapad!");
      navigate("/admin");
    } catch (error) {
      console.error("Kunde inte skapa bokningen:", error);
      alert("Något gick fel vid skapandet av bokningen.");
    }
  };

  return (
    <div>
      <h1>Lägg till ny bokning</h1>
      <BookingForm
        onSubmit={handleCreate}
        onCancel={() => navigate("/admin")}
      />
    </div>
  );
}
