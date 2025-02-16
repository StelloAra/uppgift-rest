import { useEffect, useState } from "react";

const API_URL =
  "https://school-restaurant-api.azurewebsites.net/restaurant/id:67acc4a7f9568e2823b764ab";

/* 67acd0b6f9568e2823b764b2 */

interface Restaurant {
  id: string;
  name: string;
  address: string;
  zip: string;
  city: string;
}

export const Home: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch: ${response.status} ${response.statusText}`
          );
        }
        const data: Restaurant[] = await response.json();
        console.log("API-respons:", data); // 👀 Logga hela svaret här

        if (Array.isArray(data)) {
          setRestaurants(data);
        } else {
          console.error("Fel format på API-responsen:", data);
        }
      } catch (error) {
        console.error("Kunde inte hämta restauranger:", error);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div>
      <h2>Mina restauranger</h2>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.id}>
            <strong>{restaurant.name}</strong> - {restaurant.address},{" "}
            {restaurant.zip} {restaurant.city}
          </li>
        ))}
      </ul>
    </div>
  );
};
