import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute: React.FC = () => {
    const { isLoggedIn, loading } = useAuthStore();

    if (loading) {
        return <p className="text-center text-gray-600 mt-10">Checking authentication...</p>;
    }

    if (!isLoggedIn) {
        return <Navigate to="/auth/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;