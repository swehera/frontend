import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import App_State from "./context/App_State.jsx";
import Navbar from "./components/Navbar.jsx";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Login from "./components/Login.jsx";
import Add from "./components/Add.jsx";
import Profile from "./components/Profile.jsx";
import Saved from "./components/Saved.jsx";
import Register from "./components/Register.jsx";
import Details from "./components/Details.jsx";

const Layout = () => {
  return (
    <App_State>
      <Navbar />
      <Outlet />
      <Footer />
    </App_State>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/add",
        element: <Add />,
      },
      {
        path: "/add",
        element: <Add />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/saved",
        element: <Saved />,
      },
      {
        path: "/:id",
        element: <Details />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
