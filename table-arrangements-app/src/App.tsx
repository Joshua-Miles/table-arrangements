import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { ChakraProvider, Heading } from '@chakra-ui/react'

import * as ApiInterface from './api';
import { SignUp } from "./pages/SignUp";
import { Login } from "./pages/Login";
import { Homepage } from "./pages/Homepage";
import { ViewEvent } from "./pages/events/ViewEvent";
import { ViewOrganization } from "./pages/organizations/ViewOrganization";
import { EditOrganization } from "./pages/organizations/EditOrganization";
import { CreateOrganizationUser } from "./pages/organizations/users/CreateOrganizationUser";
import { EditOrganizationUser } from "./pages/organizations/users/EditOrganizationUser";
import { EditProfile } from "./pages/profile/EditProfile";

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
    path: "/profile/edit",
    element: <EditProfile />
  },
  {
    path: "/organizations/:organizationId",
    element: <ViewOrganization />
  },
  {
    path: "/organizations/:organizationId/edit",
    element: <EditOrganization />
  },
  {
    path: "/organizations/:organizationId/users/new",
    element: <CreateOrganizationUser />
  },
  {
    path: "/organizations/:organizationId/users/:userId/edit",
    element: <EditOrganizationUser />
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
