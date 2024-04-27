import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { ChakraProvider, Heading } from '@chakra-ui/react'

import * as ApiInterface from './api';

Object.assign(window, ApiInterface);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Heading>Hello World</Heading>
  },
]);


function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
