import { VehicleRecord } from '../types';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, get, query, orderByChild, child } from 'firebase/database';

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
const vehiclesRef = ref(database, 'vehicles'); // Firebase node

export const addRecord = async (record: Omit<VehicleRecord, 'id'>): Promise<void> => {
  try {
    await push(vehiclesRef, record);
    console.log("Record added to Firebase:", record);
  } catch (error) {
    console.error("Error adding record to Firebase:", error);
    throw error;
  }
};

export const getRecords = async (): Promise<VehicleRecord[]> => {
  try {
    const snapshot = await get(query(vehiclesRef, ));
    if (snapshot.exists()) {
      const data = snapshot.val();
      const records: VehicleRecord[] = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }));
      return records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching records from Firebase:", error);
    throw error;
  }
};
