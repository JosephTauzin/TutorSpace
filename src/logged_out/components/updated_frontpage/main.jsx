import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./homepage/Home";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./errorpage/ErrorPage";
import Login from "./Login/Login";
import About from "./about/About";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
		errorElement: <ErrorPage />,
	},
	{
		path: "login",
		element: <Login />,
	},
	{
		path: "about",
		element: <About />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
