
import { useState, useEffect, useMemo, useCallback } from 'react';
import { VehicleRecord } from '../types';
import { getRecords, addRecord as apiAddRecord } from '../services/firebaseService';

export const useVehicleData = () => {
    const [records, setRecords] = useState<VehicleRecord[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchRecords = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await getRecords();
            setRecords(data);
        } catch (err) {
            setError('Kayıtlar alınırken bir hata oluştu.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchRecords();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addRecord = async (record: Omit<VehicleRecord, 'id'>) => {
        setIsLoading(true);
        try {
            await apiAddRecord(record);
            await fetchRecords(); // Re-fetch to get the latest data
        } catch (err) {
            setError('Kayıt eklenirken bir hata oluştu.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredRecords = useMemo(() => {
        if (!searchTerm) {
            return records;
        }
        const lowercasedFilter = searchTerm.toLowerCase();
        return records.filter(record =>
            Object.values(record).some(value =>
                String(value).toLowerCase().includes(lowercasedFilter)
            )
        );
    }, [records, searchTerm]);

    return {
        records: filteredRecords,
        isLoading,
        error,
        searchTerm,
        setSearchTerm,
        addRecord,
    };
};
