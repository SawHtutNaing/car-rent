import Footer from "./Footer";
import Navbar from "./Navbar";

export default function UserLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="w-full max-w-7xl mx-auto">{children}</div>
      <Footer />
    </>
  );
}
