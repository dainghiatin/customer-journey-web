import { ref, update } from "firebase/database";
import { db } from "../config/firebase-config"; // Your initialized Firebase Realtime DB

const markAsRead = async (userId, notificationId) => {
    console.log(userId, notificationId);
  const notifRef = ref(db, `notifications/${userId}/${notificationId}`);
  await update(notifRef, {
    read: true
  });
};

export default markAsRead;
