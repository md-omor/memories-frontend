import { Route, Routes } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
function App() {
  return (
    <div className=" w-full h-screen bg-gray-800 overflow-x-hidden ">
      <Navbar />
      <div className="container mx-auto px-10 ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
