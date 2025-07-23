import React from 'react'
import type {Vehicle} from '../types';
import { Link } from "react-router-dom";

interface VehicleCardProps {
    vehicle: Vehicle;
}

const vehicleTable : React.FC<VehicleCardProps> = ({vehicle}) => {
    const statusColor = vehicle.status === 'ACTIVE' ? 'text-green-600' : 'text-red-600';
    const formatDate = (isoString: string) => new Date(isoString).toLocaleString(); // <-- This is your formatting function


    return (
        <>
            <tr className="odd:bg-white even:bg-gray-100 odd:hover:bg-gray-50 even:hover:bg-gray-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {vehicle.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {vehicle.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor} bg-opacity-20 ${vehicle.status === 'ACTIVE' ? 'bg-green-100' : 'bg-red-100'}`}>
          {vehicle.status}
        </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {vehicle.fuel_level.toFixed(1)}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {vehicle.odometer.toFixed(1)} km
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {vehicle.speed.toFixed(1)} km/h
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(vehicle.updated_at)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link to={`/vehicles/${vehicle.id}`} className="text-blue-600 hover:text-blue-900">
                        View Details
                    </Link>
                </td>
            </tr>
        </>
    )
}

export default vehicleTable;