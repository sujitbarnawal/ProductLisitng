import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import PageNotFound from "./pages/PageNotFound"
import Cart from "./pages/Cart";
import { ToastContainer } from 'react-toastify';

function App() {
  const location = useLocation();

  return (
    <>
      <div>
        <ToastContainer/>
        {(location.pathname==="/" || location.pathname==="/products" || location.pathname==="/cart")
        &&<Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
