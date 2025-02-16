interface Address {
  street: string;
  zip: string;
  city: string;
}

interface Restaurant {
  name: string;
  address: Address;
}

const CreateRestaurant: React.FC = () => {
  const restaurant: Restaurant = {
    name: "Franzén",
    address: {
      street: "Drottninggatan 1",
      zip: "123 45",
      city: "Stockholm",
    },
  };

  const handleCreateRestaurant = async () => {
    try {
      const response = await fetch(
        "https://school-restaurant-api.azurewebsites.net/restaurant/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(restaurant),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create restaurant");
      }

      const data = await response.json();
      console.log("Restaurant created:", data);
      alert("Restaurant created successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create restaurant.");
    }
  };

  return (
    <div>
      <h1>Create Restaurant</h1>
      <button onClick={handleCreateRestaurant}>Create Restaurant</button>
    </div>
  );
};

export default CreateRestaurant;
