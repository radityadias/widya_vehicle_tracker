import React, { useEffect } from "react";
import { useVehicleStore } from "../store/useVehicleStore.ts";
import VehicleTable from "../components/VehicleTable";

const VehicleListPage : React.FC = () => {
    const {vehicles, loading, error, fetchVehicles} = useVehicleStore();

    useEffect(() => {
        fetchVehicles();
    },[fetchVehicles]);

    if (loading) return <p className="text-center text-gray-600 mt-10">Sedang Memuat...</p>;
    if (error) return <p className="text-center text-red-600 mt-10">Terjadi Kesalahan: {error}</p>;

    const activeCount = vehicles.filter(v => v.status === "ACTIVE").length;
    const inactiveCount = vehicles.filter(v => v.status === "INACTIVE").length;

    return (
        <>
            <div className="p-4 bg-transparent rounded-lg">
                <h1 className="text-2xl font-semibold mb-6 text-primary-dark">Overview</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-secondary-light rounded-lg p-6 text-center shadow-sm">
                        <h2 className="text-lg text-white">Total Vehicles</h2>
                        <p className="text-4xl font-semibold text-white mt-2">{vehicles.length}</p>
                    </div>
                    <div className="bg-green-400 rounded-lg p-6 text-center shadow-sm">
                        <h2 className="text-lg  text-white">Active</h2>
                        <p className="text-4xl font-semibold text-white mt-2">{activeCount}</p>
                    </div>
                    <div className="bg-secondary-red rounded-lg p-6 text-center shadow-sm">
                        <h2 className="text-lg  text-white">Inactive</h2>
                        <p className="text-4xl font-semibold text-white mt-2">{inactiveCount}</p>
                    </div>
                </div>

                <h2 className="text-2xl font-semibold mb-4 text-primary-dark">Vehicle List</h2>
                <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left ">
                        <thead className="text-xs text-gray-700 uppercase bg-white">
                        <tr>
                            <th scope="col" className="py-3 px-6">ID</th>
                            <th scope="col" className="py-3 px-6">Name</th>
                            <th scope="col" className="py-3 px-6">Status</th>
                            <th scope="col" className="py-3 px-6">Fuel Level</th>
                            <th scope="col" className="py-3 px-6">Odometer</th>
                            <th scope="col" className="py-3 px-6">Speed</th>
                            <th scope="col" className="py-3 px-6">Last Updated</th>
                            <th scope="col" className="py-3 px-6"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {vehicles.map((vehicle) => (
                            <VehicleTable key={vehicle.id} vehicle={vehicle} />
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
};

export default VehicleListPage;