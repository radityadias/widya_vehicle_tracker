import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage.tsx";
import AppLayout from "./layout/AppLayout.tsx";
import VehicleDashboardPage from "./pages/VehicleDashboardPage.tsx";
import VehicleDetailPage from "./pages/VehicleDetailPage.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

function App() {
  return (
   <Router>
        <Routes>
            <Route path="/auth/login" element={<LoginPage/>}/>

            <Route element={<ProtectedRoute/>}>
                <Route element={<AppLayout/>}>
                    <Route path="/" element={<VehicleDashboardPage/>}/>
                    <Route path="/vehicles/:id" element={<VehicleDetailPage/>}/>
                </Route>
            </Route>

            <Route path="*" element={<Navigate to="/auth/login" replace />}/>
        </Routes>
   </Router>
  )
}

export default App
