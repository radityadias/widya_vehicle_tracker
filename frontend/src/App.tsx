import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import VehicleListPage from "./pages/VehicleListPage.tsx";
import VehicleDetailPage from "./pages/VehicleDetailPage.tsx";


function App() {

  return (
   <Router>
       <div className="min-h-screen bg-[#F7FBFC] font-sans antialiased">
           <header className="bg-[#D6E6F2] text-white p-4 shadow-md">
               <nav className="container mx-auto flex justify-between items-center">
                   <h1 className="text-2xl font-bold text-[#769FCD] ">Vehicle Tracker Dashboard</h1>
                   {/* Optional: Add a login/auth button here */}
                   {/* <Link to="/login" className="text-white hover:text-blue-200">Login</Link> */}
               </nav>
           </header>

           <main className="container mx-auto p-4 py-8">
               <Routes>
                   <Route path="/" element={<VehicleListPage />} />
                   <Route path="/vehicles/:id" element={<VehicleDetailPage />} />
                   {/* Optional: Add a login route here later if needed */}
                   {/* <Route path="/login" element={<LoginPage />} /> */}
                   <Route path="*" element={<h2 className="text-center text-xl text-gray-700 mt-10">404 - Page Not Found</h2>} />
               </Routes>
           </main>
       </div>
   </Router>
  )
}

export default App
