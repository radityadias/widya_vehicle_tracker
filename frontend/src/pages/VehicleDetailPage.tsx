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
        <div className="p-4 bg-white rounded-lg shadow">
            <Link to="/" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200 mb-6">
                &larr; Back to Vehicle List
            </Link>

            <h1 className="text-3xl font-bold mb-4 text-gray-800">{selectedVehicle.name} Details</h1>
            <p className="text-gray-600 mb-2"><strong>Status:</strong> <span className={selectedVehicle.status === 'ACTIVE' ? 'text-green-600' : 'text-red-600'}>{selectedVehicle.status}</span></p>
            <p className="text-gray-600 mb-4"><strong>Last Updated:</strong> {formatDate(selectedVehicle.updated_at)}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Fuel Level</h2>
                    <p className="text-3xl font-extrabold text-blue-700">{selectedVehicle.fuel_level.toFixed(1)}%</p>
                    {/* Optional: Add a simple progress bar here */}
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Speed</h2>
                    <p className="text-3xl font-extrabold text-blue-700">{selectedVehicle.speed.toFixed(1)} km/h</p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Odometer</h2>
                    <p className="text-3xl font-extrabold text-blue-700">{selectedVehicle.odometer.toFixed(1)} km</p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-sm col-span-1 md:col-span-2 lg:col-span-3">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Location</h2>
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