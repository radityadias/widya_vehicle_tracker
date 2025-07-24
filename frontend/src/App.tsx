import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import Sidebar from "./components/Sidebar";
import VehicleDashboardPage from "./pages/VehicleDashboardPage.tsx";
import VehicleDetailPage from "./pages/VehicleDetailPage.tsx";


function App() {

  return (
   <Router>
        <Navbar />
        <Sidebar />

       <main className="p-4 sm:ml-48 bg-[#f6f9fe] min-h-screen">
           <div className="rounded-lg mt-14">
               <Routes>
                   <Route path="/" element={<VehicleDashboardPage />} />
                   <Route path="/vehicles/:id" element={<VehicleDetailPage />} />
               </Routes>
           </div>
       </main>
   </Router>
  )
}

export default App
