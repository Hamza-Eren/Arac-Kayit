
import React, { useState } from 'react';
import { useVehicleData } from '../hooks/useVehicleData';
import { VehicleRecord } from '../types';

const VehicleForm: React.FC<{ onAddRecord: (record: Omit<VehicleRecord, 'id'>) => Promise<void>; isLoading: boolean }> = ({ onAddRecord, isLoading }) => {
    const [formData, setFormData] = useState({
        plate: '',
        chassisNumber: '',
        brand: '',
        model: '',
        service: '',
        fee: '',
        date: new Date().toISOString().split('T')[0], // Today's date
    });
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccessMessage(null);
        
        const recordToSave = {
            ...formData,
            fee: parseFloat(formData.fee) || 0,
        };

        await onAddRecord(recordToSave);
        
        setFormData({
            plate: '',
            chassisNumber: '',
            brand: '',
            model: '',
            service: '',
            fee: '',
            date: new Date().toISOString().split('T')[0],
        });
        setSuccessMessage('Araç başarıyla kaydedildi!');
        setTimeout(() => setSuccessMessage(null), 3000);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-8 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Plaka" name="plate" value={formData.plate} onChange={handleChange} required />
                <InputField label="Şasi Numarası" name="chassisNumber" value={formData.chassisNumber} onChange={handleChange} required />
                <InputField label="Marka" name="brand" value={formData.brand} onChange={handleChange} required />
                <InputField label="Model" name="model" value={formData.model} onChange={handleChange} required />
                <div className="md:col-span-2">
                     <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-1">Yapılan İşlem</label>
                     <textarea
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                     />
                </div>
                <InputField label="Ücret (₺)" name="fee" type="number" value={formData.fee} onChange={handleChange} required />
                <InputField label="Tarih" name="date" type="date" value={formData.date} onChange={handleChange} required />
            </div>
            {successMessage && <div className="text-green-400 bg-green-900/50 p-3 rounded-md text-center">{successMessage}</div>}
            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors duration-200"
                >
                    {isLoading ? 'Kaydediliyor...' : 'Kaydet'}
                </button>
            </div>
        </form>
    );
};

interface InputFieldProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, type = 'text', value, onChange, required = false }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
        />
    </div>
);


const RegisterPage: React.FC = () => {
    const { addRecord, isLoading } = useVehicleData();
    
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Yeni Araç Kaydı</h1>
            <VehicleForm onAddRecord={addRecord} isLoading={isLoading} />
        </div>
    );
};

export default RegisterPage;
