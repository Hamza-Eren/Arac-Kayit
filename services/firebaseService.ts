
// This is a mock service. To connect to Firebase, you need to install firebase and uncomment the code.
// npm install firebase
import { VehicleRecord } from '../types';
/*
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, get, child, query, orderByChild } from 'firebase/database';

// IMPORTANT: Replace with your Firebase project's configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dbRef = ref(database);
*/

// MOCK DATA - Replace with Firebase implementation
let mockRecords: VehicleRecord[] = [
    { id: '1', plate: '34 ABC 123', chassisNumber: 'VN123456789', brand: 'Ford', model: 'Focus', service: 'Yağ değişimi', fee: 1500, date: '2024-07-20' },
    { id: '2', plate: '06 XYZ 789', chassisNumber: 'VN987654321', brand: 'Renault', model: 'Clio', service: 'Fren balatası değişimi', fee: 2500, date: '2024-07-21' },
    { id: '3', plate: '35 QWE 456', chassisNumber: 'VN564738291', brand: 'Toyota', model: 'Corolla', service: 'Periyodik bakım', fee: 3000, date: '2024-07-19' },
    { id: '4', plate: '16 LKM 321', chassisNumber: 'VN192837465', brand: 'Volkswagen', model: 'Passat', service: 'Lastik değişimi', fee: 4000, date: '2024-07-22' },
];

export const addRecord = async (record: Omit<VehicleRecord, 'id'>): Promise<void> => {
    console.log("Adding record:", record);
    // Firebase implementation:
    /*
    try {
        await push(child(dbRef, 'vehicles'), record);
    } catch (error) {
        console.error("Error adding record: ", error);
        throw error;
    }
    */
    
    // Mock implementation:
    const newRecord = { ...record, id: new Date().getTime().toString() };
    mockRecords = [newRecord, ...mockRecords];
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
};

export const getRecords = async (): Promise<VehicleRecord[]> => {
    console.log("Fetching records...");
    // Firebase implementation:
    /*
    try {
        const snapshot = await get(query(child(dbRef, 'vehicles'), orderByChild('date')));
        if (snapshot.exists()) {
            const data = snapshot.val();
            const records: VehicleRecord[] = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            }));
            // Firebase returns sorted ascending, so we reverse for descending order
            return records.reverse();
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error getting records: ", error);
        throw error;
    }
    */

    // Mock implementation:
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    return [...mockRecords].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
