import { createBrowserRouter } from "react-router";
import { Layout } from "./pages/Layout";
import Admin from "./pages/Admin";
import Contact from "./pages/Contact";
import { Home } from "./pages/Home";
import UpdateBooking from "./pages/UpdateBooking";
import AddBooking from "./pages/AddBooking";
import Booking from "./pages/Booking";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/booking", element: <Booking /> },
      { path: "/contact", element: <Contact /> },
      { path: "/admin", element: <Admin /> },
      { path: "/updatebooking/:bookingId", element: <UpdateBooking /> },
      { path: "/addbooking", element: <AddBooking /> },
    ],
  },
]);
