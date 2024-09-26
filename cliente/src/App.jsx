import { Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import Reservations from "./components/Reservations";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/reservations" element={<Reservations />} />
      </Route>

      {/* Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
