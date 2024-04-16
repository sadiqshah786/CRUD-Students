import { Route, Routes } from "react-router-dom";
import Create from "./components/Create";
import Update from "./components/Update";
import Home from "./modules/Home";

const App = () => {
  return (
    <div className="flex justify-center  flex-col items-center  w-1/2 my-24  m-auto">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Create />} />
        <Route path="/update/:id" element={<Update />} />
      </Routes>
    </div>
  );
};

export default App;
