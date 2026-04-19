import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CardComp } from "./components/CardComp";
import { SidebarComp } from "./components/SidebarComp";
import { AdminList } from "./components/AdminList";

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen">
        {/* LEFT SIDEBAR */}
        <SidebarComp />

        {/* RIGHT CONTENT AREA (Outlet-like) */}
        <div className="flex-1 p-4 bg-gray-600">
          <Routes>
            <Route path="/create" element={<CardComp />} />
            <Route path="/list" element={<AdminList />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
