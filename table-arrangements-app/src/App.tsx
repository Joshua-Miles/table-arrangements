import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { ChakraProvider, Heading } from '@chakra-ui/react'

import * as ApiInterface from './api';
import { SignUp } from "./pages/SignUp";
import { Login } from "./pages/Login";
import { Homepage } from "./pages/Homepage";
import { ViewWorkspace } from "./pages/workspaces/ViewWorkspace/ViewWorkspace";
import { ViewEvent } from "./pages/events/ViewEvent";

Object.assign(window, ApiInterface);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />
  },
  {
    path: "/sign-up",
    element: <SignUp />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/workspaces/:workspaceId",
    element: <ViewWorkspace />
  },
  {
    path: "/events/:eventId",
    element: <ViewEvent />
  }
]);


function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
