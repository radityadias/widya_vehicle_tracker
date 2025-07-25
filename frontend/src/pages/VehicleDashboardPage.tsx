import React, { useEffect, useState } from "react";
import { useVehicleStore } from "../store/useVehicleStore.ts";
import VehicleTable from "../components/VehicleTable.tsx";

const VehicleDashboardPage : React.FC = () => {
    const [search, setSearch] = useState("");
    const {vehicles, loading, error, fetchVehicles} = useVehicleStore();

    // Client-Side Filter
    const filteredVehicles = React.useMemo(() => {
        if (!search) {
            return vehicles;
        }
        const lowerCaseSearchTerm = search.toLowerCase();
        return vehicles.filter(vehicle =>
            vehicle.name.toLowerCase().includes(lowerCaseSearchTerm) ||
            vehicle.status.toLowerCase().includes(lowerCaseSearchTerm)
        );
    }, [vehicles, search]);

    useEffect(() => {
        fetchVehicles();
    },[fetchVehicles]);

    const activeCount = filteredVehicles.filter(v => v.status === "ACTIVE").length;
    const inactiveCount = filteredVehicles.filter(v => v.status === "INACTIVE").length;

    // Reset Seach Input
    const handleResetSearch = () => {
        setSearch('');
    };

    const showLoading = loading;
    const showError = error && !loading;
    const showNoResults = !loading && !error && filteredVehicles.length === 0 && search !== '';
    const showTable = !loading && !error && filteredVehicles.length > 0;

    return (
        <>
            <div className="p-4 bg-transparent rounded-lg">
                <div className="flex justify-start sm:justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-primary-dark">Overview</h1>
                </div>
                {/* Card */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-primary-light rounded-lg p-6 text-center shadow-sm">
                        <h2 className="text-lg text-white">Total Vehicles</h2>
                        <p className="text-4xl font-semibold text-white mt-2">{filteredVehicles.length}</p>
                    </div>
                    <div className="bg-green-400 rounded-lg p-6 text-center shadow-sm">
                        <h2 className="text-lg text-white">Active</h2>
                        <p className="text-4xl font-semibold text-white mt-2">{activeCount}</p>
                    </div>
                    <div className="bg-secondary-red rounded-lg p-6 text-center shadow-sm">
                        <h2 className="text-lg text-white">Inactive</h2>
                        <p className="text-4xl font-semibold text-white mt-2">{inactiveCount}</p>
                    </div>
                </div>
                <h2 className="text-2xl font-semibold mb-4 text-primary-dark">Vehicle List</h2>
                {/* Search */}
                <div className="mb-5">
                    <form className="max-w-md">
                        <label htmlFor="default-search"
                               className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                type="search"
                                id="default-search"
                                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white"
                                placeholder="Cari Nama Kendaraan..."
                            />
                            {search && (
                                <button
                                    type="button"
                                    onClick={handleResetSearch}
                                    className="text-gray-600 absolute end-2.5 bottom-2.5 hover:text-gray-800 font-medium rounded-lg text-sm px-4 py-2"
                                >
                                </button>
                            )}
                        </div>
                    </form>
                </div>
                {/* Tabel Kendaraan */}
                <div className="overflow-x-auto relative shadow-md sm:rounded-lg bg-white p-4">
                    {showLoading && (
                        <p className="text-center text-gray-600 py-10">Sedang Memuat...</p>
                    )}

                    {showError && (
                        <p className="text-center text-red-600 py-10">Terjadi Kesalahan: {error}</p>
                    )}

                    {showNoResults && (
                        <p className="text-center text-gray-600 py-10">Tidak ada kendaraan yang ditemukan dengan nama "{search}".</p>
                    )}

                    {showTable && (
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
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
                            {filteredVehicles.map(vehicle => (
                                <VehicleTable key={vehicle.id} vehicle={vehicle}/>
                            ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    )
};

export default VehicleDashboardPage;