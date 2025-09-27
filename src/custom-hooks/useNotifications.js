// useNotifications.js
import { useEffect, useState } from "react";
import { db } from "../config/firebase-config";
import { onChildAdded, ref, onValue } from "firebase/database";

const useNotifications = (userId) => {
    if (!userId) {
        return [];
    }
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const notifRef = ref(db, `notifications/${userId}`); // Example path: /notifications

        const unsubscribe = onValue(notifRef, (snapshot) => {
            const data = snapshot.val() || {};
            const notificationList = Object.entries(data)
                .filter(([key, value]) =>
                    typeof value === "object" &&
                    value !== null &&
                    "message" in value &&
                    "pushDate" in value
                )
                .sort((a, b) => b[1].pushDate - a[1].pushDate)
                .map(([key, value]) => ({
                    id: key,
                    ...value
                }))
            setNotifications(notificationList);
        });

        // Cleanup not needed for onChildAdded, but you can stop listening if needed
        return () => {
            // You can implement unsubscribe logic if needed
        };
    }, [userId]);

    return notifications;
};

export default useNotifications;
