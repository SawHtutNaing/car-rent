import { createApi, fetchBaseQuery, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, doc, getDocs } from 'firebase/firestore'
import { db } from '../firebase';

export const firebaseApi = createApi({
    reducerPath: 'firebaseApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    tagTypes: ["Post"],
    endpoints: (builder) => ({

        // ...

        // Fetch documents endpoint
        fetchRecords: builder.query({

            query: async () => {
                const recordsCollection = collection(db, 'records');
                const querySnapshot = await getDocs(recordsCollection);
                const records = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                return { data: records };
            },
        }),
    }),
})

// Export hooks for usage in components
export const { useFetchRecordsQuery } = firebaseApi
