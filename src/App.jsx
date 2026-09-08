import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Initiatives from "./pages/Initiatives";
import SDG from "./pages/SDG";
import Publish from "./pages/Publish";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <>
            <Home />
            <About />
            <SDG />
            <Initiatives />
          </>
        ),
      },
    ],
  },
  {
    path: "/publish",
    element: <Publish />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
