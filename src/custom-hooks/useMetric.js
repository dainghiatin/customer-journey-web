// useNotifications.js
import { useEffect, useState } from "react";
import { db } from "../config/firebase-config";
import { onChildAdded, ref, onValue } from "firebase/database";

const useMetric = () => {
    
    const [metrics, setMetrics] = useState([]);

    useEffect(() => {
        const metricRef = ref(db, `metrics`); // Example path: /metrics

        const unsubscribe = onValue(metricRef, (snapshot) => {
            const data = snapshot.val() || {};
            console.log(data);
            setMetrics(data);
        });

        // Cleanup not needed for onChildAdded, but you can stop listening if needed
        return () => {
            // You can implement unsubscribe logic if needed
        };
    }, []);

    return metrics;
};

export default useMetric;
