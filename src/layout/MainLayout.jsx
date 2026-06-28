import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

function MainLayout() {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />

        <main className="pb-16 md:pb-0">
          <Outlet />
        </main>

        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
}

export default MainLayout;