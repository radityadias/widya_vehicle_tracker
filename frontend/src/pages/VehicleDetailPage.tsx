import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useVehicleStore } from '../store/useVehicleStore';

const VehicleDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { selectedVehicle, loading, error, fetchVehiclesById, clearSelectedVehicles } = useVehicleStore();

    useEffect(() => {
        if (id) {
            fetchVehiclesById(parseInt(id));
        }
        return () => {
            clearSelectedVehicles();
        };
    }, [id, fetchVehiclesById, clearSelectedVehicles]);

    if (loading) return <p className="text-center text-gray-600 mt-10">Loading vehicle details...</p>;
    if (error) return <p className="text-center text-red-600 mt-10">Error: {error}</p>;
    if (!selectedVehicle) return <p className="text-center text-gray-700 mt-10">Vehicle not found or no ID provided.</p>;

    const formatCoordinate = (coord: number) => coord.toFixed(5);
    const formatDate = (isoString: string) => new Date(isoString).toLocaleString();

    return (
        <div className="p-4 bg-gray-50 min-h-screen rounded-lg">
            {/* Button Back to Dashboard */}
            <div className="flex justify-start sm:justify-between ">
                <Link to="/"
                      className="inline-block bg-secondary-dark hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded transition duration-200 mb-6 text-sm">
                    <span className="inline sm:hidden">&larr; Back</span>
                    <span className="hidden sm:inline">&larr; Back to Dashboard</span>
                </Link>
                <h1 className="text-3xl font-semibold mb-6 text-gray-700 hidden sm:inline">Vehicle Detail</h1>
            </div>

            {/* Detail Kendaraan */}
            <h1 className="text-3xl font-bold mb-4 text-gray-800">{selectedVehicle.name}</h1>
            <p className="text-gray-600 font-medium mb-2"><strong>Status:</strong> <span className={selectedVehicle.status === 'ACTIVE' ? 'text-green-600' : 'text-red-600'}>{selectedVehicle.status}</span></p>
            <p className="text-gray-600 mb-4"><strong>Last Updated:</strong> {formatDate(selectedVehicle.updated_at)}</p>

            {/* Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                <div className="bg-primary-light rounded-lg p-6 shadow-md">
                    <h2 className="text-xl font-semibold text-white mb-2">Fuel Level</h2>
                    <p className="text-3xl font-semibold text-white">{selectedVehicle.fuel_level.toFixed(1)}%</p>
                </div>
                <div className="bg-green-400 rounded-lg p-6 shadow-md">
                    <h2 className="text-xl font-semibold text-white mb-2">Speed</h2>
                    <p className="text-3xl font-semibold text-white">{selectedVehicle.speed.toFixed(1)} km/h</p>
                </div>

                <div className="bg-secondary-red rounded-lg p-6 shadow-md">
                    <h2 className="text-xl font-semibold text-white mb-2">Odometer</h2>
                    <p className="text-3xl font-semibold text-white">{selectedVehicle.odometer.toFixed(1)} km</p>
                </div>

                <div className="bg-white shadow rounded-lg p-6 col-span-1 md:col-span-2 lg:col-span-3">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Location</h2>
                    <p className="text-gray-700">Latitude: {formatCoordinate(selectedVehicle.latitude)}</p>
                    <p className="text-gray-700">Longitude: {formatCoordinate(selectedVehicle.longtitude)}</p>
                    {/* Placeholder for map */}
                    <div className="bg-gray-200 h-64 flex items-center justify-center mt-4 rounded-md text-gray-500 font-medium">
                        [Map Placeholder]
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleDetailPage;