import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import PageNotFound from "./pages/PageNotFound"

function App() {
  const location = useLocation();

  return (
    <>
      <div>
        {(location.pathname==="/" || location.pathname==="/products")
        &&<Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
