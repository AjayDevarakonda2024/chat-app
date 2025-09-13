// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// Replace 10.13.2 with latest version of the Firebase JS SDK.
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyCpEfUV8L8RiRUST-NiSNM5fJZuGTsJjSI",
  authDomain: "push-notifications-be506.firebaseapp.com",
  projectId: "push-notifications-be506",
  storageBucket: "push-notifications-be506.firebasestorage.app",
  messagingSenderId: "261901199823",
  appId: "1:261901199823:web:82da6e41baea0fd30ecaba",
  measurementId: "G-G54V2R3C1R"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  // Customize notification here
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: "./whats app.png",
    data: {
      url: payload.data.link || "/", // ✅ Save target URL
    },
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// ✅ Handle notification clicks
self.addEventListener("notificationclick", function (event) {
  console.log("Notification click received:", event);

  event.notification.close();

  // Open app or focus existing tab
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        // If app is already open, focus it
        if (client.url === event.notification.data.url && "focus" in client) {
          return client.focus();
        }
      }
      // If app is not open, open it
      if (clients.openWindow) {
        return clients.openWindow(event.notification.data.url);
      }
    })
  );
});