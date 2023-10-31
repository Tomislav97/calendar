import React from "react";
import ReactDOM from "react-dom";
import {ApolloProvider, ApolloClient, InMemoryCache} from "@apollo/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./error-page";
import App from "./App";
import {CalendarContainer} from "./components/calendar/CalendarContainer.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: '/:date',
        element: <CalendarContainer/>
    }
]);

const client = new ApolloClient({
    uri: 'https://spacex-production.up.railway.app/',
    cache: new InMemoryCache()
});

const rootElement = document.getElementById("root");
ReactDOM.render(
    <ApolloProvider client={client}>
        <RouterProvider router={router}/>
    </ApolloProvider>,
    rootElement
);