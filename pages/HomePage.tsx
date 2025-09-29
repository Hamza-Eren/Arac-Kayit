
import React from 'react';
import { useVehicleData } from '../hooks/useVehicleData';
import VehicleTable from '../components/VehicleTable';

const SearchBar: React.FC<{ value: string; onChange: (value: string) => void }> = ({ value, onChange }) => (
    <div className="mb-6">
        <input
            type="text"
            placeholder="Kayıtlarda ara (Plaka, Marka, Model vb.)..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400"
        />
    </div>
);

const HomePage: React.FC = () => {
    const { records, isLoading, error, searchTerm, setSearchTerm } = useVehicleData();

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Araç Kayıtları</h1>
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            {error && <p className="text-red-400 bg-red-900/50 p-3 rounded-lg">{error}</p>}
            <VehicleTable records={records} isLoading={isLoading} />
        </div>
    );
};

export default HomePage;
