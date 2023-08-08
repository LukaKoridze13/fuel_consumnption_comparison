import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./Reset.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);
const RootElement = document.getElementById("root");

if (RootElement) {
  ReactDOM.createRoot(RootElement).render(<RouterProvider router={router} />);
}
