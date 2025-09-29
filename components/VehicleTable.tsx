
import React from 'react';
import { VehicleRecord } from '../types';

interface VehicleTableProps {
    records: VehicleRecord[];
    isLoading: boolean;
}

const VehicleTable: React.FC<VehicleTableProps> = ({ records, isLoading }) => {
    const tableHeaders = ['Plaka', 'Marka', 'Model', 'Yapılan İşlem', 'Ücret', 'Tarih'];

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (records.length === 0) {
        return <div className="text-center py-10 bg-gray-800 rounded-lg"><p className="text-gray-400">Gösterilecek kayıt bulunamadı.</p></div>;
    }

    return (
        <div className="overflow-x-auto bg-gray-800 rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700/50">
                    <tr>
                        {tableHeaders.map(header => (
                            <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {records.map((record) => (
                        <tr key={record.id} className="hover:bg-gray-700/50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{record.plate}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{record.brand}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{record.model}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 max-w-xs truncate">{record.service}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{record.fee.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{new Date(record.date).toLocaleDateString('tr-TR')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-400"></div>
    </div>
);

export default VehicleTable;
